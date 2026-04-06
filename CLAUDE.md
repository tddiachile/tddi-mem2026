# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive presentation/portfolio website for Sodexo's TDDI (Transformación Digital e Innovación) team. Deployed as a static site via GitHub Pages.

## Development

**No build step required.** Open `index.html` directly in a browser or serve locally:

```bash
# Any static file server works, e.g.:
python -m http.server 8080
npx serve .
```

There are no dependencies to install — all libraries are loaded from CDN at runtime.

## Architecture

**Zero-build static site** using CDN-delivered libraries:
- React 18 + Babel Standalone (in-browser JSX transpilation)
- Tailwind CSS 3 (utility classes + custom config)
- D3.js v7 (Gantt chart and trajectory chart rendering)
- Custom Sodexo design system (`css/styles.css`)

### Key files

- `index.html` — Main React app. All React components are defined inline inside a `<script type="text/babel">` block.
- `locales.json` — All translatable text for Spanish (`es`) and English (`en`). Slide content, labels, and data are driven from this file.
- `css/styles.css` — Sodexo brand system: CSS variables, `.sdx-card`, `.nav-btn`, `.team-avatar`, `.status-badge`, `.slide-dot`, and slide transition animations.
- `js/utils.js` — Pure helpers: `getInitials()`, `lightenHex()`, `accessibleText()`.
- `assets/` — Images (e.g., `pilares.png` for the 5 TDDI pillars).
- `pages/equipo.html` — Team member detail profiles (standalone static page).
- `pages/proyectos.html` — Project descriptions and metrics (standalone static page).
- `pages/metodo_trabajo.html` — Governance/Technology Committee detail (standalone static page).

### Slide system

The app renders 12 slides controlled by `displayIdx` state via `SEGMENTS_CONFIG`. Navigation supports keyboard (arrow keys, spacebar), sidebar menu, and footer dot pagination. Transitions are staggered: 300ms exit → content swap → 400ms enter.

**Current slides (in order):**
| # | Component | Description |
|---|-----------|-------------|
| 0 | `SegHome` | Landing / title slide |
| 1 | `SegAbout` | Who we are + org chart |
| 2 | `SegMethod` | Governance / Technology Committee workflow |
| 3 | `SegMetrics` | Metrics Governance (2022–2025) |
| 4 | `SegPortfolio` | High-impact projects portfolio |
| 5 | `SegCurrentProjects` | Current projects Gantt chart (D3) |
| 6 | `SegRegionalReach` | Chile developments shown to Region/Global |
| 7 | `SegGlobalPlatforms` | Global platforms (MyWay, SMS, migrations) |
| 8 | `SegGBSTransition` | GBS Transition TCS — achievements, risks, alerts |
| 9 | `SegTicketStatus` | GBS Transition — ticket status tables + 100% stacked bar chart |
| 10 | `SegSecurityBaseline` | Security baseline [MSB] — controls table + action plan |
| 11 | `SegImprovements` | Improvement opportunities |

### i18n system

All user-facing text lives in `locales.json` under `es` and `en` keys. The `segments` array defines sidebar/nav labels (must match `SEGMENTS_CONFIG` length). Each slide reads its content from a dedicated key (e.g., `t.currentProjects`, `t.gbsTransition`).

### Gantt chart (Slide 5)

The Gantt chart is rendered with D3.js. Each project has `phases` — an array of phase-lines (rows), where each line contains phase objects with `label`, `start`, `end`, and `color`. Projects with multiple rows (e.g., POS-Retail with 2 lines) use `"rows": 2`. Labels support `\n` for multiline text inside bars.

**Phase color convention:**
| Phase type | Color |
|---|---|
| Evaluación / Evaluation | Green `#34A866` |
| Implementación / Implementation | Blue `#2A295C` |
| Desarrollo / Development | Orange `#EF661A` |
| Aprobación / Approval | Purple `#915FC8` |

## Sodexo Brand

**Colors (CSS variables and Tailwind extensions):**
| Variable | Hex | Usage |
|----------|-----|-------|
| `--sdx-blue` | `#283897` | Primary brand |
| `--sdx-red` | `#EE0000` | Accent, card top bars |
| `--sdx-dark` | `#2A295C` | Text, dark elements |
| `--sdx-sky` | `#199CDA` | Secondary |
| `--sdx-green` | `#34A866` | Tertiary |

**Typography:** Open Sans (Google Fonts) for body; Arial for headings. All headings render in lowercase per brand standard.

## Deployment

Push to `main` branch — GitHub Pages serves the site automatically. The `.nojekyll` file disables Jekyll processing so the static files are served as-is.

Remote: `git@github-gdcl:tddiachile/tddi-mem2026.git`
