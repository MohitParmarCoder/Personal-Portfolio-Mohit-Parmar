# Personal Portfolio — Mohit Parmar

Personal portfolio website of **Mohit Parmar**, Senior Full Stack Developer (React.js · Node.js ·
TypeScript · AWS) based in Ahmedabad, India.

**Status:** not currently published. Automatic deployment is switched off — see
[Deployment](#deployment). When published, the site serves from
https://mohitparmarcoder.github.io/Personal-Portfolio-Mohit-Parmar/

## About the site

A static single page application — no backend, no database, no tracking. It is built with React 18,
TypeScript and Vite, bundled to plain HTML, CSS and JavaScript and served from GitHub Pages.

Sections: Home, About, Experience, Projects, Skills and Contact — six, each covering one thing.
An earlier cut had twelve, and the products, domains and capabilities were each restated three
times over; impact figures now sit inside Experience, domains are tags on the project cards, and
the résumé download sits with the other contact routes.

Features:

- Dark theme by default with a light theme toggle, remembered in `localStorage`
- **Impact figures** inside Experience — every number quoted from the CV rather than estimated
- Filterable project cards tagged by industry, with a cursor-tracking hover glow
- Scroll-reveal animations and animated counters built on `IntersectionObserver` (no animation
  library)
- Downloadable résumé, generated social preview card and `Person` structured data for search
- Fully responsive, with `prefers-reduced-motion` respected throughout

### Design

Deep navy ground with an indigo → cyan gradient used only on headline words and primary actions.
Type is Space Grotesk for headings and Inter for everything else.

Every text token clears WCAG AA (4.5:1) in both themes. Filled surfaces that carry white text use
a separate indigo → violet ramp — the display gradient runs into cyan, where white drops to
1.81:1.

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
skills, projects, industries, services and contact channels. Editing that one file changes the whole
site — no component changes required.

The downloadable résumé is [`public/Mohit_Parmar_Resume.pdf`](public/Mohit_Parmar_Resume.pdf).
Replace the file, keeping the name, to publish a new version.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages. **Automatic
deployment is currently switched off** — the `push` trigger is commented out so that merging to
`main` no longer republishes the site. The workflow still runs on demand from the Actions tab.

Turning the workflow off does not remove a site that is already published. To take the live site
down, unpublish it in **Settings → Pages → Unpublish site**. To publish again, restore the `push`
trigger or run the workflow manually.

**One-time setup:** in **Settings → Pages**, set **Source** to **GitHub Actions**. Until that is
done, `actions/configure-pages` fails with `Get Pages site failed ... Not Found`. The workflow
cannot do this for you: the action's `enablement` input needs a token other than `GITHUB_TOKEN`,
and with the default token it fails with `Resource not accessible by integration`.

Pages also requires the repository to be **public**, or the account to be on a **paid plan** (Pro,
Team or Enterprise). A private repository on a free account cannot serve Pages at all.

## Project structure

```
├── .github/workflows/deploy.yml   Build and deploy to GitHub Pages
├── public/
│   ├── Mohit_Parmar_Resume.pdf    Downloadable résumé
│   ├── profile.jpg                Portrait used in the hero and nav
│   ├── profile-portrait.jpg       4:5 crop for tall frames
│   ├── og-image.jpg               Social preview card (1200×630)
│   ├── favicon.png                Site icon, cropped from the portrait
│   ├── apple-touch-icon.png
│   └── favicon.svg                Monochrome mask icon
├── src/
│   ├── components/                One component per section
│   ├── data/content.ts            All site content
│   ├── hooks.ts                   Reveal, active section, theme, counters, typewriter
│   ├── utils.ts                   Base-path-aware asset URLs
│   ├── styles.css                 Design tokens and all styling
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── vite.config.ts
```

## Contact

- Email: mohitparmar9868@gmail.com
- LinkedIn: [mohitparmar9868](https://www.linkedin.com/in/mohitparmar9868)
- GitHub: [@MohitParmarCoder](https://github.com/MohitParmarCoder)
