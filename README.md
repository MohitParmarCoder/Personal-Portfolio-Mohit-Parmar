# Personal Portfolio — Mohit Parmar

Personal portfolio website of **Mohit Parmar**, Senior Full Stack Developer (React.js · Node.js ·
TypeScript · AWS) based in Ahmedabad, India.

**Live site:** https://mohitparmarcoder.github.io/Personal-Portfolio-Mohit-Parmar/

## About the site

A static single page application — no backend, no database, no tracking. It is built with React 18,
TypeScript and Vite, bundled to plain HTML, CSS and JavaScript and served from GitHub Pages.

Sections: Home, About, Experience, Skills, Tech Stack, Projects, Timeline, Services, GitHub
activity, Résumé and Contact.

Features:

- Dark theme by default with a light theme toggle, remembered in `localStorage`
- Scroll-reveal animations and animated counters built on `IntersectionObserver` (no animation
  library)
- Filterable project cards with a cursor-tracking hover glow
- Live GitHub profile counters from the public API, degrading gracefully when unavailable
- Downloadable résumé
- Fully responsive, with `prefers-reduced-motion` respected throughout

Client and product names are deliberately generalised throughout the site. Commercial work is
described by capability rather than by customer, in line with contractual confidentiality.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 18 |
| Language | TypeScript (strict) |
| Build | Vite 5 |
| Styling | Hand-written CSS with custom properties |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions |

Runtime dependencies are `react` and `react-dom` only.

## Running locally

```bash
npm install
npm run dev        # dev server at http://localhost:5173/Personal-Portfolio-Mohit-Parmar/
npm run build      # type-check, then bundle to dist/
npm run preview    # serve the production build
npm run typecheck  # type-check only
```

To build for the site root instead of the repository sub-path — useful for a custom domain or a
local preview — override the base path:

```bash
BASE_PATH=/ npm run build
```

## Editing the content

All copy lives in [`src/data/content.ts`](src/data/content.ts): profile details, experience,
skills, projects, timeline, services and contact channels. Editing that one file changes the whole
site — no component changes required.

The downloadable résumé is [`public/Mohit_Parmar_Resume.pdf`](public/Mohit_Parmar_Resume.pdf).
Replace the file, keeping the name, to publish a new version.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to
`main`, and can also be run manually from the Actions tab.

The workflow enables Pages itself (`configure-pages` runs with `enablement: true`), so no manual
setup is needed — provided the repository is eligible. **GitHub Pages requires the repository to be
public, or the account to be on a paid plan** (Pro, Team or Enterprise). A private repository on a
free account cannot serve Pages at all, and the deploy step will fail regardless of the workflow.

## Project structure

```
├── .github/workflows/deploy.yml   Build and deploy to GitHub Pages
├── public/
│   ├── Mohit_Parmar_Resume.pdf    Downloadable résumé
│   └── favicon.svg
├── src/
│   ├── components/                One component per section
│   ├── data/content.ts            All site content
│   ├── hooks.ts                   Reveal, active section, theme, counters, GitHub stats
│   ├── utils.ts                   Base-path-aware asset URLs
│   ├── styles.css                 Design tokens and all styling
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── vite.config.ts
```

## Contact

- Email: mohitparmar9868@gmail.com
- LinkedIn: [mohit-parmar-729717185](https://www.linkedin.com/in/mohit-parmar-729717185)
- GitHub: [@MohitParmarCoder](https://github.com/MohitParmarCoder)
