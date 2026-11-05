# Project Instructions

## File responsibilities

- `index.html`: page structure, content, and IDs used by JavaScript. Keep it focused on markup; do not add new inline scripts or styles.
- `styles.css`: all page styling.
- `contact.js`: contact details, footer contact links, and contact form behavior.
- `paraiso-gallery.js`: Paraíso gallery rendering, image count, and photo lightbox.
- `img/`: static images published with the site. Use paths relative to the repository root, such as `./img/Smash/IMG_1008-HDR.jpg`. This repository currently has no `public/` directory.

The project is a static GitHub Pages site. Do not rely on a server API or on browser code being able to enumerate a folder. Keep image paths in JavaScript, not as Base64 embedded in HTML. The current `window.paraisoPhotos` list is still in `index.html`; move it to a dedicated file such as `paraiso-photos.js` when extending the list, and load that file before `paraiso-gallery.js`.

## JavaScript conventions

- Put new behavior in a focused `.js` file and load it with a script tag in `index.html`.
- Use named functions with descriptive `camelCase` names. Prefer named event handlers over anonymous function or arrow callbacks.
- Preserve these existing page functions in `index.html`: `openProject(id)`, `closeProject()`, `openContact(event)`, and `closeContact()`.
- Preserve these gallery functions exposed by `paraiso-gallery.js`: `openPhoto(index)`, `movePhoto(direction)`, and `closePhoto()`.
- Keep contact data and gallery data out of the HTML as those areas are next modified; do not duplicate values or image paths.
- Use relative asset paths so images load on GitHub Pages.

## Current gallery behavior

`paraiso-gallery.js` reads `window.paraisoPhotos`, fills `#galleryGrid`, updates `#paraisoPhotoCount`, and controls `#photoLightbox`. The list currently contains one image from `img/Smash/`. Update the image list in one place when adding photos; do not restore the removed hard-coded “53 fotografias” count.
