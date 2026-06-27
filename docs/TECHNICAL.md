# Portfolio Project V5 — Technical Overview

## Project Summary
A single-page portfolio for Mahlatse showcasing development, design, photography, and creative work.

Built as a static HTML/CSS/JavaScript website with Bootstrap 5.3.3 and custom interactive UI components.

## Key Files
- `index.html` — main page markup, structured sections, Bootstrap carousels, and hero media layers
- `css/style.css` — global theme, layout, typography, hero effects, gallery styling, and custom component styles
- `js/main.js` — navigation controls, theme toggle, mobile drawer, active section link tracking, and gallery carousel initialization
- `js/hero.js` — hero sequence control, slide autoplay, progress bar, and showreel video handling
- `js/animations.js` — scroll reveal animations, skill bar fill animation, progress bar on scroll
- `js/contact.js` — contact form validation, success state, and audio feedback
- `assets/` — image assets, video files, and downloadable CV

## Technologies Used
- HTML5
- CSS3
- JavaScript (vanilla)
- Bootstrap 5.3.3
- Google Fonts: `Space Grotesk`, `Inter`

## Site Features
- Hero section with:
  - layered full-viewport background images
  - cinematic fade transitions
  - inline video showreel playback
  - slide indicators and progress bar
- Responsive navigation:
  - desktop nav links
  - mobile drawer with accessible toggle
  - scroll-aware active section highlighting
- About section with timeline and biography
- Creative identity and skills sections with reveal animations
- Featured project carousel with project cards and preview images
- Photography gallery carousel with autoplay and hover interaction
- Contact form with validation and success feedback tone
- Light/dark mode toggle

## Interaction Behavior
- `js/hero.js` manages the hero slideshow and transitions
- `css/style.css` defines cinematic fade easing and hover states
- `js/main.js` initializes the gallery carousel with autoplay, hover pause/resume, and touch support
- `js/animations.js` uses IntersectionObserver to reveal sections and animate skill bars
- `js/contact.js` validates form fields and triggers a short success sound sequence

## Development Notes
- The project is static and does not require a build step
- Recommended workflow: edit `index.html` for content, `css/style.css` for visuals, and JS files for UX behavior
- Use a local web server for the best browser experience when serving video/media files

## File Structure
```
portfolio-v5/
├─ assets/
│  ├─ bantubahle.jpg
│  ├─ citynight-lights.jpg
│  ├─ dawn.jpg
│  ├─ day-in-the-life-2.mp4
│  ├─ fiverr.png
│  ├─ image-carousel.png
│  ├─ mlhatshe-profile-picture.png
│  └─ ...
├─ css/
│  └─ style.css
├─ js/
│  ├─ main.js
│  ├─ hero.js
│  ├─ animations.js
│  └─ contact.js
├─ index.html
└─ TECHNICAL.md
```

## How to Run
1. Open `index.html` in a browser.
2. For local media/video support, serve the folder via a simple local server.

## Enhancement Ideas
- add lazy loading for gallery images using `loading="lazy"`
- add keyboard navigation for the gallery and project carousel
- extract repeated carousel slide markup into reusable templates or JavaScript rendering
- add a service worker for offline caching and faster reloads
