"""
Exportar presentación TDDI a PDF usando Selenium + Chrome.

Uso:
    pip install selenium Pillow
    python export_pdf.py

Opciones:
    python export_pdf.py --output mi_presentacion.pdf
    python export_pdf.py --lang en
    python export_pdf.py --slides 10
"""

import argparse
import base64
import http.server
import json
import os
import socket
import sys
import threading
import time


def find_free_port(start=8080):
    for port in range(start, start + 100):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(("127.0.0.1", port)) != 0:
                return port
    raise RuntimeError("No se encontró un puerto libre")


def start_server(directory, port):
    os.chdir(directory)
    handler = http.server.SimpleHTTPRequestHandler
    httpd = http.server.HTTPServer(("127.0.0.1", port), handler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    return httpd


def export_pdf(url, output_path, lang="es", total_slides=10):
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.common.by import By
    from selenium.webdriver.common.keys import Keys
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC

    print(f"  Abriendo Chrome headless...")

    opts = Options()
    opts.add_argument("--headless=new")
    opts.add_argument("--window-size=1920,1080")
    opts.add_argument("--disable-gpu")
    opts.add_argument("--no-sandbox")
    opts.add_argument("--ignore-certificate-errors")
    opts.add_argument("--disable-dev-shm-usage")
    opts.add_argument("--force-device-scale-factor=0.9")

    driver = webdriver.Chrome(options=opts)

    try:
        print(f"  Cargando {url}")
        driver.get(url)
        time.sleep(4)  # Esperar React + D3

        # Cambiar idioma si necesario
        if lang == "en":
            try:
                btn = driver.find_element(By.XPATH, "//button[text()='EN']")
                btn.click()
                time.sleep(1)
            except Exception:
                pass

        # Cerrar el menu lateral para dar mas espacio al contenido
        driver.execute_script("""
            document.dispatchEvent(new MouseEvent('mousedown', {bubbles: true, clientX: 800, clientY: 400}));
        """)
        time.sleep(0.5)

        # Pre-renderizar: navegar por todas las slides con flechas para que D3 dibuje
        print(f"  Pre-renderizando {total_slides} diapositivas...")
        body = driver.find_element(By.TAG_NAME, "body")
        for i in range(total_slides - 1):
            body.send_keys(Keys.ARROW_RIGHT)
            time.sleep(1.2)

        # Volver al slide 0 via JS (sin animacion)
        driver.execute_script("""
            // Buscar los dots de navegacion y clickear el primero
            const dots = document.querySelectorAll('.slide-dot');
            if (dots.length > 0) dots[0].click();
        """)
        time.sleep(1.5)

        # Cargar títulos desde locales.json
        locales_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "locales.json")
        with open(locales_path, "r", encoding="utf-8") as f:
            locales = json.load(f)
        slide_titles = locales.get(lang, {}).get("segments", [])
        while len(slide_titles) < total_slides:
            slide_titles.append(f"Slide {len(slide_titles) + 1}")

        # Ocultar header y footer para capturar solo el contenido central
        driver.execute_script("""
            const header = document.querySelector('.site-header');
            const footer = document.querySelector('.slide-footer');
            if (header) { header.style.height = '0'; header.style.overflow = 'hidden'; header.style.padding = '0'; header.style.border = 'none'; }
            if (footer) { footer.style.height = '0'; footer.style.overflow = 'hidden'; footer.style.padding = '0'; footer.style.border = 'none'; }
        """)
        time.sleep(0.5)

        # Capturar cada slide usando los dots de navegacion
        screenshots = []
        print("  Capturando diapositivas...")

        for i in range(total_slides):
            # Navegar al slide i clickeando su dot
            driver.execute_script(f"""
                const dots = document.querySelectorAll('.slide-dot');
                if (dots[{i}]) dots[{i}].click();
            """)
            time.sleep(1.5)

            png = driver.get_screenshot_as_png()
            screenshots.append(png)
            print(f"    Slide {i + 1}/{total_slides} OK")

        # Ensamblar PDF
        print("  Ensamblando PDF...")
        create_pdf(screenshots, slide_titles, output_path)

        print(f"\n  [OK] PDF generado: {output_path}")
        print(f"     {len(screenshots)} paginas - landscape")

    finally:
        driver.quit()


def create_pdf(png_list, titles, output_path):
    from PIL import Image, ImageDraw, ImageFont
    import io

    title_bar_h = 60  # px de alto para el título
    sdx_dark = (0x2A, 0x29, 0x5C)

    # Intentar cargar fuente con soporte bold
    try:
        font = ImageFont.truetype("arialbd.ttf", 32)
    except OSError:
        try:
            font = ImageFont.truetype("Arial Bold.ttf", 32)
        except OSError:
            try:
                font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 32)
            except OSError:
                font = ImageFont.load_default()

    pages = []
    for idx, png_bytes in enumerate(png_list):
        img = Image.open(io.BytesIO(png_bytes)).convert("RGB")
        w, h = img.size
        title_text = titles[idx] if idx < len(titles) else f"Slide {idx + 1}"

        # Crear imagen con espacio para título arriba
        page = Image.new("RGB", (w, h + title_bar_h), (255, 255, 255))
        draw = ImageDraw.Draw(page)

        # Dibujar título
        draw.text((20, 12), title_text, fill=sdx_dark, font=font)
        # Línea separadora azul debajo del título
        draw.line([(0, title_bar_h - 2), (w, title_bar_h - 2)], fill=(0x28, 0x38, 0x97), width=3)

        # Pegar la captura debajo
        page.paste(img, (0, title_bar_h))
        pages.append(page)

    if not pages:
        print("  [WARN] No se capturaron imágenes")
        return

    pages[0].save(
        output_path,
        "PDF",
        resolution=150.0,
        save_all=True,
        append_images=pages[1:],
    )


def main():
    parser = argparse.ArgumentParser(description="Exportar presentación TDDI a PDF")
    parser.add_argument("--output", "-o", default="presentacion_tddi.pdf", help="Archivo PDF de salida")
    parser.add_argument("--port", "-p", type=int, default=0, help="Puerto del servidor (0=auto)")
    parser.add_argument("--lang", "-l", choices=["es", "en"], default="es", help="Idioma")
    parser.add_argument("--slides", "-s", type=int, default=12, help="Número de diapositivas")
    parser.add_argument("--url", "-u", default=None, help="URL directa (omite servidor local)")
    args = parser.parse_args()

    project_dir = os.path.dirname(os.path.abspath(__file__))

    print("\n  Exportador de Presentacion TDDI -> PDF")
    print("  -----------------------------------------\n")

    httpd = None
    if args.url:
        url = args.url
    else:
        port = args.port or find_free_port()
        print(f"  Servidor local en puerto {port}...")
        httpd = start_server(project_dir, port)
        url = f"http://127.0.0.1:{port}/index.html"

    try:
        output = os.path.join(project_dir, args.output)
        export_pdf(url, output, lang=args.lang, total_slides=args.slides)
    except ImportError as e:
        print(f"\n  [WARN] Dependencia faltante: {e}")
        print("    pip install selenium Pillow\n")
        sys.exit(1)
    except Exception as e:
        print(f"\n  [ERROR] {e}")
        sys.exit(1)
    finally:
        if httpd:
            httpd.shutdown()


if __name__ == "__main__":
    main()
