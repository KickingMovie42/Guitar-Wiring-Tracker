# Guitar Wiring Tracker

A complete, build-free website for manually tracing a guitar wiring diagram and checking off each connection as you finish it. The application uses separate HTML, CSS, and JavaScript files and runs entirely in your browser.

## Open in VS Code

1. Choose **File → Open Folder** and select `Guitar-Wiring-Tracker`, or open `Guitar-Wiring-Tracker.code-workspace`.
2. Open `index.html`.
3. For a live preview, install the recommended **Live Server** extension, then right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly in a modern browser. No application dependencies, account, build command, or backend are required. A local server gives browser storage a more predictable origin than opening a file directly.

If Python is installed, another preview option is:

```sh
python3 -m http.server 5500 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:5500`.

## Using the tracker

- **Upload diagram:** Choose a PNG, JPEG, WebP, GIF, or SVG, or drop it onto the canvas. Confirm replacement of the current workspace. Your new diagram starts with an empty checklist.
- **Trace:** Tap or click points along one wire. Hold Shift to align the next point horizontally or vertically. Choose **Finish wire**, or press Enter. Name the connection and choose its color and width in the editor.
- **Edit:** Select a wire, then drag its point handles. Double-click a segment to insert a point. Select a point and choose **Remove point** to remove it; at least two points are required. Details and path edits are undoable.
- **Track:** Tap a wire to toggle its completion. At crossings, choose the intended wire from the overlap dialog. Checklist checkboxes do the same thing and support keyboard use.
- **Fade or hide:** Choose how completed overlays appear under **Diagram display**. Hidden wires remain in the checklist, where you can restore them. Edit mode can select hidden wires and shows a selected hidden wire faintly.
- **Zoom and pan:** Scroll to zoom around the pointer, use +/−, or choose Fit. Use Pan mode, the middle mouse button, or Space + drag to pan. Touch users can pinch to zoom and pan with two fingers.
- **Undo and redo:** Use the buttons, Ctrl/Cmd Z, or Ctrl/Cmd Shift Z. Undo also removes the last point of an unfinished trace. History includes completion, details, path changes, deletion, display settings, reset, upload, and import. It retains up to 75 changes during the current session.
- **Checklist and progress:** Search connection names or filter by All, To do, and Complete. Progress reflects every wire in the project, regardless of the active filter.
- **Backups:** Export creates a JSON file containing the diagram image, paths, wire details, progress, and display preferences. Import restores it on another device running this tracker. The bundled example is embedded as a PNG when exported.

### Uploaded pictures are not automatically recognized

Tracing is manual. A raster diagram is a single image; the application cannot remove individual printed lines from it. Fade and hide apply to the traced SVG overlays. Reduce **Original diagram** opacity if the printed lines make the overlays hard to see. Uploaded SVGs are rendered as pictures and converted to PNG; their paths are not automatically imported as wires.

## Example diagram

`assets/diagrams/example-wiring.svg` is an original, illustrative single-coil practice layout. Eight manually defined, editable paths demonstrate the tracker. This is not a verified soldering plan: use your component manufacturer's wiring instructions for an actual build.

The earlier ChatGPT conversation's uploaded sample and prototype source were not available through the conversation reference, so this project includes a new practice diagram instead. You can upload the original sample whenever you have it.

## Privacy, storage, and limits

- Diagram processing stays in the browser. There are no analytics, external fonts, or application network requests for uploaded images.
- The browser stores the latest workspace locally. Export regularly; private browsing, clearing browser data, storage quotas, or changing the site origin can remove local progress.
- If storage fails, the tracker displays a warning and remains usable; export before closing it.
- Undo/redo history, the current view, checklist filters, and unfinished traces are not included in backups or restored after reloading.
- One workspace at a time. Use separate exported JSON files for separate builds.
- Uploads are limited to 8 MB, 40 megapixels, and 20,000 pixels on either side. JSON imports/exports are limited to 12 MB, 1,000 wires, 5,000 points per wire, and 50,000 total points.
- JSON imports accept embedded raster images or the bundled example reference. External image URLs and embedded SVG data are rejected. Image dimensions and wire data are validated before replacing the workspace.
- Clearing browser storage is not undoable. Replacing a project through the app is undoable within the session.
- Publishing the website publishes its source and bundled example. A visitor's locally uploaded diagrams and progress are not added to the GitHub repository.

## Project files

```text
Guitar-Wiring-Tracker/
├── index.html
├── style.css
├── script.js
├── README.md
├── Guitar-Wiring-Tracker.code-workspace
├── package.json
├── .nojekyll
├── .gitignore
├── .vscode/
│   └── extensions.json
├── assets/
│   ├── favicon.svg
│   └── diagrams/example-wiring.svg
└── tests/
    └── core.test.js
```

The website needs only `index.html`, `style.css`, `script.js`, and `assets/`. The script exports its data/history/geometry helpers in Node.js for testing, and initializes the application in a browser. The built-in diagram is also embedded in `script.js` so direct-file preview can export it without cross-origin canvas restrictions; update that embedded copy if you replace the built-in SVG asset.

## Tests

Install Node.js 20 or newer to run the core tests. No packages need to be installed:

```sh
npm test
```

Alternatively:

```sh
node --test tests/core.test.js
```

The suite checks project validation, malformed imports, bounds, geometry, crossing selection, hidden-wire hit testing, and history isolation. Browser acceptance checks should cover uploads, tracing/editing, progress, undo/redo, zoom/pan, overlap choices, export/import, reload persistence, and narrow-screen layout. Browser checks are separate from these core tests.

## GitHub and GitHub Pages

External publishing requires the owner's approval and a GitHub connection with repository write/admin access. Local files do not publish themselves.

Once approved:

1. Create a repository named `Guitar-Wiring-Tracker` in your GitHub account. A public repository can use GitHub Pages on GitHub Free.
2. Upload/push these project files to the repository's `main` branch, keeping `index.html` at the root.
3. Open repository **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`, and save.
5. Use the deployed link shown in Pages settings after the deployment finishes.

All application asset links are relative, so the site works under a repository subpath. `.nojekyll` keeps the plain static files from being processed by Jekyll.

GitHub's current setup instructions: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

If Git is already installed, the usual first upload is:

```sh
git init
git add .
git commit -m "Add Guitar Wiring Tracker"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Guitar-Wiring-Tracker.git
git push -u origin main
```

Replace `YOUR_USERNAME` with the repository owner's login. Do not replace an existing remote or overwrite an existing repository without reviewing it first. To update a published site, commit and push your edits; Pages deploys from the configured publishing branch.
