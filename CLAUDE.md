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
- Custom Sodexo design system (`css/styles.css`)

### Key files

- `index.html` — Main React app (~28KB). All React components are defined inline inside a `<script type="text/babel">` block. Components: `SegHome`, `SegAbout`, `SegTeam`, `SegProjects`, `Card`, `OrgNode`, `OrgBranch`, `OrgRow`.
- `css/styles.css` — Sodexo brand system: CSS variables, `.sdx-card`, `.nav-btn`, `.team-avatar`, `.status-badge`, `.slide-dot`, and slide transition animations.
- `js/utils.js` — Pure helpers: `getInitials()`, `lightenHex()`, `accessibleText()`.
- `pages/equipo.html` — Team member detail profiles (standalone static page).
- `pages/proyectos.html` — Project descriptions and metrics (standalone static page).

### Slide system

The app renders four slides (Home, About, Team, Projects) controlled by `displayIdx` state. Navigation supports keyboard (arrow keys, spacebar), sidebar menu, and footer dot pagination. Transitions are staggered: 300ms exit → content swap → 400ms enter.

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

Remote: `git@github-gdcl:SdxCLDev/tddi-mem2026.git`
