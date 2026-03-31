/**
 * Sodexo Team Presentation — Utilidades
 * Funciones auxiliares no relacionadas con React/JSX
 */

'use strict';

/**
 * Devuelve las iniciales de un nombre completo (máx. 2 caracteres).
 * @param {string} name
 * @returns {string}
 */
function getInitials(name) {
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Aclara un color hex mezclándolo con blanco.
 * @param {string} hex  — color base en formato '#RRGGBB'
 * @param {number} amount — 0 (sin cambio) a 1 (blanco total)
 * @returns {string}
 */
function lightenHex(hex, amount = 0.15) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.round(((n >> 16) & 0xff) + (255 - ((n >> 16) & 0xff)) * amount));
  const g = Math.min(255, Math.round(((n >>  8) & 0xff) + (255 - ((n >>  8) & 0xff)) * amount));
  const b = Math.min(255, Math.round(( n        & 0xff) + (255 - ( n        & 0xff)) * amount));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

/**
 * Devuelve el color de texto que garantiza legibilidad (AA) sobre un fondo dado.
 * Retorna el Azul Sodexo o el Azul Oscuro-Violeta según las directrices de marca.
 * @param {string} bgHex
 * @returns {string}
 */
function accessibleText(bgHex) {
  const n = parseInt(bgHex.slice(1), 16);
  const r = (n >> 16) & 0xff;
  const g = (n >>  8) & 0xff;
  const b =  n        & 0xff;
  // Luminancia relativa (WCAG)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? '#283897' : '#ffffff';
}
