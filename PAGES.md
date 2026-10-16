# GitHub Pages preview

The Goblin-Plünderer preview is prepared for publication from the `feature/goblin-preview` branch. GitHub Pages is not enabled yet, so the public page is not available.

- Preview file: `preview/goblin-pluenderer.html`
- Intended URL: `https://cuddlerandom.github.io/Eclipse-Ascension/goblin-pluenderer.html`
- Deployment workflow: `.github/workflows/pages.yml`
- The workflow deploys only the existing `preview/` directory. It runs when that directory or the workflow changes, and can also be started manually.
- The workflow run failed while configuring Pages because its GitHub Actions token cannot create a Pages site for this repository (`Resource not accessible by integration`). Enable Pages with GitHub Actions in the repository settings, then rerun the workflow.
- The preview uses Babylon.js from its public CDN and supports finger drag to rotate and pinch to zoom.

The existing preview file and branches were preserved. No preview files or branches were replaced or deleted.
