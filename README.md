# floatingpoint.

![floatingpoint. Site Preview](https://raw.githubusercontent.com/GrungeElFz/Astro_Personal.Site/b06c0190b5fd998f15bfc4762c6e1b95fdda416a/public/Banner-Astro_floatingpoint.png)

## Project Status:

This project is currently under `active` development. Features and content are continuously being refined and expanded upon.

<br/>

## Tech Stack

`floatingpoint.` leverages a modern and robust set of libraries and tools to deliver a high performance and engaging experience:

- **Astro**: The core of the website, providing a flexible and performant framework for content-driven sites.
- **React**: Utilized for interactive UI components, enhancing dynamic sections of the site.
- **TypeScript**: Ensures type safety and improves code quality and maintainability across the project.
- **Tailwind CSS**: For utility-first styling, enabling rapid and consistent design implementation.
- **Vite**: Powers the lightning-fast development server and optimized production builds.
- **Bun**: The JavaScript runtime and package manager used for efficient dependency management and script execution.
- **SoundCloud API**: Integrates with SoundCloud to display and manage audio content seamlessly.

---

## Domain and Hosting

The domain for `floatingpoint.` is registered with **Cloudflare**. The project itself is hosted on **Vercel**, providing a reliable and scalable platform for deployment and continuous integration.

---

## Project Structure

```
.
├── astro.config.mjs
├── bun.lock
├── components.json
├── package.json
├── public
│   ├── favicon.svg
│   └── floatingpoint.png
├── README.md
├── src
│   ├── assets
│   │   ├── astro.svg
│   │   ├── background.svg
│   │   ├── events
│   │   │   ├── cover-4x5-bipolarity.png
│   │   │   ├── cover-4x5-engrammatic-eden.png
│   │   │   ├── cover-4x5-the-deans-list.png
│   │   │   └── cover-4x5-zenith.png
│   │   ├── icon.png
│   │   ├── logo_horizontal.png
│   │   └── logo.png
│   ├── components
│   │   ├── collaborations
│   │   │   ├── role
│   │   │   │   ├── RoleCard.tsx
│   │   │   │   └── RoleSection.tsx
│   │   │   └── venue
│   │   │   ├── VenueBenefits.astro
│   │   │   ├── VenueCriteria.astro
│   │   │   ├── VenueCTA.astro
│   │   │   └── VenueHero.astro
│   │   ├── events
│   │   │   ├── EventCard.tsx
│   │   │   └── EventSection.tsx
│   │   ├── genres
│   │   │   ├── GenreCard.tsx
│   │   │   └── GenreSection.tsx
│   │   ├── navigations
│   │   │   ├── CollaborationsDropdown.tsx
│   │   │   ├── Footer.astro
│   │   │   ├── Header.astro
│   │   │   └── MobileMenu.tsx
│   │   ├── sets
│   │   │   ├── SetCard.tsx
│   │   │   ├── SetFeature.tsx
│   │   │   └── SetSection.tsx
│   │   ├── ui
│   │   │   ├── button.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── collapsible.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── skeleton.tsx
│   │   ├── videos
│   │   │   ├── VideoSection.tsx
│   │   │   └── youtube
│   │   │   ├── YouTubeCard.tsx
│   │   │   ├── YouTubeFeature.tsx
│   │   │   └── YouTubeSection.tsx
│   │   └── waveguide
│   │   ├── WaveguideCTA.astro
│   │   └── WaveguideSection.astro
│   ├── data
│   │   ├── events.ts
│   │   ├── genres.ts
│   │   ├── roles.ts
│   │   ├── sets.ts
│   │   └── videos.ts
│   ├── layouts
│   │   ├── Layout.astro
│   │   └── LegalLayout.astro
│   ├── lib
│   │   └── utils.ts
│   ├── pages
│   │   ├── about.astro
│   │   ├── api
│   │   │   └── sets.ts
│   │   ├── collaborations
│   │   │   ├── operation.astro
│   │   │   └── venue.astro
│   │   ├── cookies.md
│   │   ├── events.astro
│   │   ├── index.astro
│   │   ├── nerdstats.astro
│   │   ├── privacy.md
│   │   ├── robots.txt.ts
│   │   ├── sets.astro
│   │   ├── terms.md
│   │   └── videos.astro
│   └── styles
│   └── global.css
├── tsconfig.json
└── vite.config.js

24 directories, 69 files
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command               | Action                                                            |
| :-------------------- | :---------------------------------------------------------------- |
| `bun install`         | Installs project dependencies.                                    |
| `bun run dev`         | Starts the local development server at `localhost:4321`.          |
| `bun build`           | Builds your production-ready site into the \`./dist/\` directory. |
| `bun preview`         | Previews your built site locally before deployment.               |
| `bun astro ...`       | Executes Astro CLI commands (e.g., `astro add`, `astro check`).   |
| `bun astro -- --help` | Displays help information for using the Astro CLI.                |
