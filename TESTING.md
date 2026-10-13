# Test results

Verified on October 12, 2026.

## Automated checks

All 16 core tests passed using Node.js. They cover project validation and limits, malformed project data, unsafe image URLs, geometry, crossing selection, hidden-wire hit testing, and independent undo/redo snapshots.

## Browser acceptance checks

The following checks passed in the Codex in-app browser using the project served over local HTTP:

- Example loads with eight manually defined connections.
- Checklist completion updates progress; undo, redo, and keyboard undo restore it.
- Hide removes the completed overlay; the checklist restores it.
- Searching connection names filters the list without changing total progress.
- Tracing three points creates a new wire and checklist entry.
- Editing the connection name and width survives export/import.
- Dragging a point updates the path; inserting/removing a point is undoable.
- Direct wire taps toggle completion.
- Crossing selection lists both overlapping wires and changes only the chosen wire.
- Zoom in/out, Fit, and dragging in Pan mode update the view correctly.
- Wire deletion and resetting progress can be undone.
- JSON export embeds the example as a PNG and retains paths, details, and completion.
- Importing that export restores the complete project; reloading preserves it in local storage.
- SVG upload is rasterized, and starts with no automatically traced wires.
- PNG upload starts with an empty checklist and zero overlay paths.
- Upload replacement is undoable.
- Malformed JSON and external-image imports are rejected without changing the workspace.
- Desktop layout was inspected at 1440 × 1000.
- Phone layout was inspected at 390 × 844; zoom controls work. A narrow-screen sidebar sizing issue was fixed and rechecked.
- No application errors appeared in the browser error log during the final checks.

## Published website checks

The public HTTPS website at https://kickingmovie42.github.io/Guitar-Wiring-Tracker/ was deployed successfully on GitHub Pages and checked separately from local preview.

- HTML, CSS, JavaScript, favicon, and example SVG are reachable online and exactly match the tested project files.
- The example opens with eight connections and zero completed wires.
- Completing a wire, undo/redo, zoom, Fit, and reload persistence passed online.
- Online JSON export contains eight paths, the correct completion state, and an embedded PNG diagram.
- Importing that backup restores progress; undo restores the previous workspace.
- No errors appeared in the published website's browser error log during these checks.

## Verification limits

Actual multi-touch pinch gestures and physical mobile devices were not exercised. Other browser engines were not independently tested. Direct file-URL preview could not be checked because the testing browser permits only HTTP/HTTPS; local HTTP preview passed. Storage exhaustion and permission-denied storage scenarios were not induced. These limits do not affect the completed HTTP preview checks above.
