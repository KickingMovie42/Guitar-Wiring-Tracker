(function () {
  'use strict';

  const SCHEMA_VERSION = 1;
  const MAX_FILE_BYTES = 12 * 1024 * 1024;
  const EXAMPLE_SOURCE = 'assets/diagrams/example-wiring.svg';
  const EXAMPLE_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAwIiBoZWlnaHQ9IjY1MCIgdmlld0JveD0iMCAwIDEwMDAgNjUwIj4KICA8cmVjdCB3aWR0aD0iMTAwMCIgaGVpZ2h0PSI2NTAiIHJ4PSIxMiIgZmlsbD0iI2ZmZiIvPgogIDxnIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZmlsbD0iIzI0NDYzOCI+CiAgICA8dGV4dCB4PSI1MCIgeT0iNTIiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSJib2xkIiBsZXR0ZXItc3BhY2luZz0iMiI+U0lOR0xFLUNPSUwgLyBQUkFDVElDRSBMQVlPVVQ8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iNzMiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5NGExOGYiPjMgUElDS1VQUyDCtyAxIFZPTFVNRSDCtyAxIFRPTkUgwrcgNS1XQVkgU1dJVENIPC90ZXh0PgogICAgPHRleHQgeD0iOTUwIiB5PSI1MiIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzk0YTE4ZiI+Q09NUE9ORU5UIFZJRVc8L3RleHQ+CiAgPC9nPgogIDxnIHN0cm9rZT0iIzc1ODU3NSIgZmlsbD0iI2Y4ZmFmNiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgIDxyZWN0IHg9Ijg1IiB5PSIxMzUiIHdpZHRoPSIxODAiIGhlaWdodD0iNjQiIHJ4PSIyOCIvPgogICAgPHJlY3QgeD0iODUiIHk9IjI4MCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSI2NCIgcng9IjI4Ii8+CiAgICA8cmVjdCB4PSI4NSIgeT0iNDI1IiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjY0IiByeD0iMjgiLz4KICAgIDxyZWN0IHg9IjQ3MCIgeT0iMTU1IiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEwMCIgcng9IjEyIiBmaWxsPSIjZjNmMGU2Ii8+CiAgICA8Y2lyY2xlIGN4PSI1NTAiIGN5PSIzOTAiIHI9IjU2IiBmaWxsPSIjZWRlZWU1Ii8+CiAgICA8Y2lyY2xlIGN4PSI3NzUiIGN5PSIzOTAiIHI9IjU2IiBmaWxsPSIjZWRlZWU1Ii8+CiAgICA8cmVjdCB4PSI3MzUiIHk9IjUyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI1NSIgcng9IjEyIi8+CiAgICA8cmVjdCB4PSI0NjAiIHk9IjUzNSIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIyOCIgcng9IjUiIGZpbGw9IiNlOWViZTMiLz4KICA8L2c+CiAgPGcgZmlsbD0iI2M5Y2ZjMiIgc3Ryb2tlPSIjOGM5OTg3IiBzdHJva2Utd2lkdGg9IjEuNSI+CiAgICA8Y2lyY2xlIGN4PSIxMTAiIGN5PSIxNjciIHI9IjgiLz48Y2lyY2xlIGN4PSIxMzYiIGN5PSIxNjciIHI9IjgiLz48Y2lyY2xlIGN4PSIxNjIiIGN5PSIxNjciIHI9IjgiLz48Y2lyY2xlIGN4PSIxODgiIGN5PSIxNjciIHI9IjgiLz48Y2lyY2xlIGN4PSIyMTQiIGN5PSIxNjciIHI9IjgiLz48Y2lyY2xlIGN4PSIyNDAiIGN5PSIxNjciIHI9IjgiLz4KICAgIDxjaXJjbGUgY3g9IjExMCIgY3k9IjMxMiIgcj0iOCIvPjxjaXJjbGUgY3g9IjEzNiIgY3k9IjMxMiIgcj0iOCIvPjxjaXJjbGUgY3g9IjE2MiIgY3k9IjMxMiIgcj0iOCIvPjxjaXJjbGUgY3g9IjE4OCIgY3k9IjMxMiIgcj0iOCIvPjxjaXJjbGUgY3g9IjIxNCIgY3k9IjMxMiIgcj0iOCIvPjxjaXJjbGUgY3g9IjI0MCIgY3k9IjMxMiIgcj0iOCIvPgogICAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iNDU3IiByPSI4Ii8+PGNpcmNsZSBjeD0iMTM2IiBjeT0iNDU3IiByPSI4Ii8+PGNpcmNsZSBjeD0iMTYyIiBjeT0iNDU3IiByPSI4Ii8+PGNpcmNsZSBjeD0iMTg4IiBjeT0iNDU3IiByPSI4Ii8+PGNpcmNsZSBjeD0iMjE0IiBjeT0iNDU3IiByPSI4Ii8+PGNpcmNsZSBjeD0iMjQwIiBjeT0iNDU3IiByPSI4Ii8+CiAgICA8Y2lyY2xlIGN4PSI1NTAiIGN5PSIzOTAiIHI9IjE5IiBmaWxsPSIjYzNjOGI4Ii8+PGNpcmNsZSBjeD0iNzc1IiBjeT0iMzkwIiByPSIxOSIgZmlsbD0iI2MzYzhiOCIvPgogICAgPHJlY3QgeD0iNTEwIiB5PSIyNDIiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNCIgcng9IjIiLz48cmVjdCB4PSI1NDAiIHk9IjI0MiIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE0IiByeD0iMiIvPjxyZWN0IHg9IjU3MCIgeT0iMjQyIiB3aWR0aD0iMTIiIGhlaWdodD0iMTQiIHJ4PSIyIi8+CiAgICA8cmVjdCB4PSI1MjAiIHk9IjQzOCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE3IiByeD0iMiIvPjxyZWN0IHg9IjU0NCIgeT0iNDM4IiB3aWR0aD0iMTIiIGhlaWdodD0iMTciIHJ4PSIyIi8+PHJlY3QgeD0iNTY4IiB5PSI0MzgiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNyIgcng9IjIiLz4KICAgIDxyZWN0IHg9Ijc0NSIgeT0iNDM4IiB3aWR0aD0iMTIiIGhlaWdodD0iMTciIHJ4PSIyIi8+PHJlY3QgeD0iNzY5IiB5PSI0MzgiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxNyIgcng9IjIiLz48cmVjdCB4PSI3OTMiIHk9IjQzOCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjE3IiByeD0iMiIvPgogIDwvZz4KICA8ZyBzdHJva2U9IiM4Yjk3N2YiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSI+PHBhdGggZD0iTTUwNSAxOTVoOTBNNTUwIDE3NXY0MCIvPjxwYXRoIGQ9Ik03NjcgNTM2djI0bTI1LTIyaDIwdjE2aC0yMCIvPjxwYXRoIGQ9Ik00NzUgNTQ5aDExMCIvPjwvZz4KICA8ZyBmaWxsPSIjYzdhMzY1IiBzdHJva2U9IiM5OTdlNGUiPjxjaXJjbGUgY3g9IjI2NSIgY3k9IjE2NyIgcj0iNSIvPjxjaXJjbGUgY3g9IjI2NSIgY3k9IjMxMiIgcj0iNSIvPjxjaXJjbGUgY3g9IjI2NSIgY3k9IjQ1NyIgcj0iNSIvPjxjaXJjbGUgY3g9IjUyNiIgY3k9IjQ0NyIgcj0iNSIvPjxjaXJjbGUgY3g9IjU1MCIgY3k9IjQ0NyIgcj0iNSIvPjxjaXJjbGUgY3g9Ijc1MSIgY3k9IjQ0NyIgcj0iNSIvPjxjaXJjbGUgY3g9IjgwMCIgY3k9IjU0NyIgcj0iNSIvPjwvZz4KICA8ZyBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM2ZTdlNmEiPgogICAgPHRleHQgeD0iMTc1IiB5PSIxMjMiPk5FQ0s8L3RleHQ+PHRleHQgeD0iMTc1IiB5PSIyNjgiPk1JRERMRTwvdGV4dD48dGV4dCB4PSIxNzUiIHk9IjQxMyI+QlJJREdFPC90ZXh0PgogICAgPHRleHQgeD0iNTUwIiB5PSIxNDQiPjUtV0FZIFNFTEVDVE9SPC90ZXh0Pjx0ZXh0IHg9IjU1MCIgeT0iMzE5Ij5WT0xVTUU8L3RleHQ+PHRleHQgeD0iNzc1IiB5PSIzMTkiPlRPTkU8L3RleHQ+CiAgICA8dGV4dCB4PSI3OTUiIHk9IjU5OCI+T1VUUFVUIEpBQ0s8L3RleHQ+PHRleHQgeD0iNTMwIiB5PSI1ODkiPkJSSURHRSBHUk9VTkQ8L3RleHQ+CiAgPC9nPgogIDxwYXRoIGQ9Ik01MCA2MTVIOTUwIiBzdHJva2U9IiNlNmVhZGYiLz4KICA8dGV4dCB4PSI1MCIgeT0iNjM2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iOSIgZmlsbD0iIzlkYTY5NCI+SUxMVVNUUkFUSVZFIEVYQU1QTEUgwrcgRk9SIFRSQUNJTkcgUFJBQ1RJQ0UgwrcgTk9UIEEgVkVSSUZJRUQgU09MREVSSU5HIFBMQU48L3RleHQ+Cjwvc3ZnPgo=';
  const STORAGE_KEY = 'guitar-wiring-tracker-v1';
  const COLORS = ['#c4674c', '#b79b48', '#608c70', '#587fa5', '#8e6a9c', '#4e605a'];

  function cloneProject(project) {
    return {
      schemaVersion: project.schemaVersion,
      name: project.name,
      diagram: { ...project.diagram },
      settings: { ...project.settings },
      wires: project.wires.map(wire => ({ ...wire, points: wire.points.map(point => ({ ...point })) }))
    };
  }

  function makeExample() {
    const definitions = [
      ['Neck → selector', '#c4674c', [[265, 167], [350, 167], [350, 220], [486, 220]]],
      ['Middle → selector', '#b79b48', [[265, 312], [380, 312], [380, 200], [486, 200]]],
      ['Bridge → selector', '#608c70', [[265, 457], [410, 457], [410, 180], [486, 180]]],
      ['Selector → volume', '#c4674c', [[516, 249], [460, 249], [460, 475], [526, 475], [526, 447]]],
      ['Volume → output tip', '#587fa5', [[550, 447], [550, 490], [690, 490], [690, 547], [800, 547]]],
      ['Volume → tone', '#b79b48', [[526, 447], [526, 475], [751, 475], [751, 447]]],
      ['Ground → output sleeve', '#4e605a', [[550, 390], [660, 390], [660, 563], [767, 563], [767, 547]]],
      ['Bridge ground → volume', '#4e605a', [[530, 549], [625, 549], [625, 390], [550, 390]]]
    ];
    return {
      schemaVersion: SCHEMA_VERSION,
      name: 'Classic single-coil build',
      diagram: { src: EXAMPLE_SOURCE, width: 1000, height: 650, name: 'Example · single-coil layout' },
      settings: { completedStyle: 'fade', imageOpacity: 1 },
      wires: definitions.map((definition, index) => ({
        id: 'example-' + (index + 1), label: definition[0], color: definition[1], width: 5,
        completed: false, points: definition[2].map(pair => ({ x: pair[0], y: pair[1] }))
      }))
    };
  }

  function validateProject(input) {
    function requireValue(condition, message) {
      if (!condition) throw new Error(message);
    }
    function validText(value, maximum) {
      return typeof value === 'string' && value.trim().length > 0 && value.length <= maximum;
    }
    function validNumber(value, minimum, maximum) {
      return Number.isFinite(value) && value >= minimum && value <= maximum;
    }
    requireValue(input && input.schemaVersion === SCHEMA_VERSION, 'Unsupported project format. Use a version 1 Guitar Wiring Tracker JSON export.');
    requireValue(validText(input.name, 120), 'Project name must contain 1–120 characters.');
    const diagram = input.diagram;
    requireValue(diagram && validText(diagram.name, 240), 'The project needs a diagram name.');
    requireValue(validNumber(diagram.width, 1, 20000) && validNumber(diagram.height, 1, 20000) && diagram.width * diagram.height <= 40000000, 'Diagram dimensions are invalid or exceed 40 megapixels.');
    requireValue(typeof diagram.src === 'string' && diagram.src.length <= MAX_FILE_BYTES, 'Diagram image is missing or too large.');
    requireValue(diagram.src === EXAMPLE_SOURCE || /^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/=\r\n]+$/.test(diagram.src), 'Diagram must be an embedded PNG, JPG, WebP, or GIF. External image URLs and embedded SVG are not imported.');
    const settings = input.settings;
    requireValue(settings && ['fade', 'hide', 'show'].includes(settings.completedStyle) && validNumber(settings.imageOpacity, 0, 1), 'Project display settings are invalid.');
    requireValue(Array.isArray(input.wires) && input.wires.length <= 1000, 'A project supports up to 1,000 wires.');
    const identifiers = new Set();
    let pointCount = 0;
    const wires = input.wires.map(wire => {
      requireValue(wire && typeof wire.id === 'string' && /^[\w-]{1,80}$/.test(wire.id) && !identifiers.has(wire.id), 'Wire identifiers must be valid and unique.');
      identifiers.add(wire.id);
      requireValue(validText(wire.label, 120), 'Each wire needs a name of 1–120 characters.');
      requireValue(typeof wire.color === 'string' && /^#[\da-f]{6}$/i.test(wire.color), 'Wire colors must be six-digit hex colors.');
      requireValue(validNumber(wire.width, 1, 30) && typeof wire.completed === 'boolean', 'Wire width or completion status is invalid.');
      requireValue(Array.isArray(wire.points) && wire.points.length >= 2 && wire.points.length <= 5000, 'Each wire needs 2–5,000 points.');
      pointCount += wire.points.length;
      requireValue(pointCount <= 50000, 'A project supports up to 50,000 total points.');
      const points = wire.points.map(point => {
        requireValue(point && validNumber(point.x, 0, diagram.width) && validNumber(point.y, 0, diagram.height), 'Wire points must be finite coordinates inside the diagram.');
        return { x: point.x, y: point.y };
      });
      return { id: wire.id, label: wire.label.trim(), color: wire.color, width: wire.width, completed: wire.completed, points };
    });
    return { schemaVersion: SCHEMA_VERSION, name: input.name.trim(), diagram: { src: diagram.src, width: diagram.width, height: diagram.height, name: diagram.name.trim() }, settings: { completedStyle: settings.completedStyle, imageOpacity: settings.imageOpacity }, wires };
  }

  function closestOnSegment(point, start, end) {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const lengthSquared = deltaX * deltaX + deltaY * deltaY;
    const fraction = lengthSquared ? Math.max(0, Math.min(1, ((point.x - start.x) * deltaX + (point.y - start.y) * deltaY) / lengthSquared)) : 0;
    const closest = { x: start.x + fraction * deltaX, y: start.y + fraction * deltaY };
    return { point: closest, distance: Math.hypot(point.x - closest.x, point.y - closest.y) };
  }

  function nearestSegment(point, wire) {
    let nearest = { distance: Infinity, index: -1, point };
    for (let index = 0; index < wire.points.length - 1; index++) {
      const candidate = closestOnSegment(point, wire.points[index], wire.points[index + 1]);
      if (candidate.distance < nearest.distance) nearest = { ...candidate, index };
    }
    return nearest;
  }

  function hitWires(point, wires, tolerance, completedStyle) {
    return wires.filter(wire => !(wire.completed && completedStyle === 'hide'))
      .map(wire => ({ wire, distance: nearestSegment(point, wire).distance }))
      .filter(candidate => candidate.distance <= tolerance + candidate.wire.width / 2)
      .sort((first, second) => first.distance - second.distance)
      .map(candidate => candidate.wire);
  }

  class ProjectHistory {
    constructor(project, limit = 75) {
      this.present = cloneProject(project);
      this.past = [];
      this.future = [];
      this.limit = limit;
    }
    commit(project) {
      if (JSON.stringify(project) === JSON.stringify(this.present)) return false;
      this.past.push(this.present);
      if (this.past.length > this.limit) this.past.shift();
      this.present = cloneProject(project);
      this.future = [];
      return true;
    }
    undo() {
      if (this.past.length) {
        this.future.push(this.present);
        this.present = this.past.pop();
      }
      return cloneProject(this.present);
    }
    redo() {
      if (this.future.length) {
        this.past.push(this.present);
        this.present = this.future.pop();
      }
      return cloneProject(this.present);
    }
  }

  const core = { makeExample, validateProject, cloneProject, closestOnSegment, nearestSegment, hitWires, ProjectHistory, MAX_FILE_BYTES };
  if (typeof module !== 'undefined' && module.exports) module.exports = core;
  if (typeof document === 'undefined') return;

  const element = identifier => document.getElementById(identifier);
  const svg = element('diagram-svg');
  const imageElement = element('diagram-image');
  const canvas = element('canvas');
  let project = makeExample();
  let restoreError = '';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) project = validateProject(JSON.parse(saved));
  } catch (error) {
    restoreError = 'Saved workspace could not be restored. Import a JSON backup, or continue with the example.';
  }
  const history = new ProjectHistory(project);
  let mode = 'track';
  let selectedId = null;
  let selectedPoint = -1;
  let filter = 'all';
  let draft = [];
  let view = { x: -45, y: -35, width: 1090, height: 720 };
  let fitView = { ...view };
  let spaceHeld = false;
  let gesture = null;
  let pinch = null;
  let touchGesture = false;
  let toastTimer;
  let importBusy = false;
  const pointers = new Map();

  function toast(message) {
    clearTimeout(toastTimer);
    element('toast').textContent = message;
    element('toast').hidden = false;
    toastTimer = setTimeout(() => { element('toast').hidden = true; }, 6000);
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
      element('save-status').textContent = 'Saved on this device';
    } catch (error) {
      element('save-status').textContent = 'Not saved — export a backup';
      toast('Browser storage is unavailable or full. Export your project to keep these changes.');
    }
  }

  function commit(change) {
    const next = cloneProject(project);
    change(next);
    if (!history.commit(next)) return;
    project = cloneProject(history.present);
    persist();
    render();
  }

  function pointString(points) {
    return points.map(point => point.x + ',' + point.y).join(' ');
  }

  function svgNode(tag, attributes) {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  }

  function svgScale() {
    const matrix = svg.getScreenCTM();
    return matrix ? Math.hypot(matrix.a, matrix.b) : 1;
  }

  function renderWires() {
    const layer = element('wire-layer');
    layer.replaceChildren();
    const scale = svgScale();
    project.wires.forEach(wire => {
      const hidden = wire.completed && project.settings.completedStyle === 'hide';
      if (hidden && !(mode === 'edit' && wire.id === selectedId)) return;
      const group = svgNode('g', { 'data-wire-id': wire.id, opacity: wire.completed && project.settings.completedStyle !== 'show' ? .17 : 1 });
      if (wire.id === selectedId) group.append(svgNode('polyline', { points: pointString(wire.points), class: 'wire-selected', 'stroke-width': wire.width + 8 / scale }));
      group.append(svgNode('polyline', { points: pointString(wire.points), class: 'wire-halo', 'stroke-width': wire.width + 3 / scale }));
      group.append(svgNode('polyline', { points: pointString(wire.points), class: 'wire-path', stroke: wire.color, 'stroke-width': wire.width }));
      const title = svgNode('title', {});
      title.textContent = wire.label + (wire.completed ? ' (complete)' : '');
      group.append(title);
      layer.append(group);
    });
    renderHandles();
    renderDraft();
  }

  function renderHandles() {
    const layer = element('handle-layer');
    layer.replaceChildren();
    const wire = project.wires.find(candidate => candidate.id === selectedId);
    if (mode !== 'edit' || !wire) return;
    wire.points.forEach((point, index) => {
      layer.append(svgNode('circle', { cx: point.x, cy: point.y, r: 6 / svgScale(), 'stroke-width': 1.5 / svgScale(), 'data-point-index': index, class: 'point-handle' + (selectedPoint === index ? ' active' : '') }));
    });
    element('remove-point').disabled = selectedPoint < 0 || wire.points.length <= 2;
  }

  function renderDraft() {
    const layer = element('draft-layer');
    layer.replaceChildren();
    if (draft.length) {
      layer.append(svgNode('polyline', { points: pointString(draft), stroke: COLORS[project.wires.length % COLORS.length], 'stroke-width': 4 / svgScale(), class: 'wire-path', 'stroke-dasharray': 7 / svgScale() + ' ' + 5 / svgScale() }));
      draft.forEach(point => layer.append(svgNode('circle', { cx: point.x, cy: point.y, r: 4 / svgScale(), fill: '#fff', stroke: '#27634f', 'stroke-width': 1.5 / svgScale() })));
    }
    element('trace-count').textContent = draft.length ? draft.length + ' points · Enter to finish' : 'Tap along a wire to add points.';
    element('finish-trace').disabled = draft.length < 2;
    element('remove-draft-point').disabled = !draft.length;
  }

  function renderList() {
    const list = element('wire-list');
    list.replaceChildren();
    const query = element('wire-search').value.toLowerCase();
    const visible = project.wires.filter(wire => wire.label.toLowerCase().includes(query) && (filter === 'all' || (filter === 'complete' ? wire.completed : !wire.completed)));
    visible.forEach(wire => {
      const item = document.createElement('li');
      item.className = 'wire-item' + (wire.completed ? ' completed' : '') + (wire.id === selectedId ? ' selected' : '');
      item.dataset.wireId = wire.id;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'wire-checkbox';
      checkbox.checked = wire.completed;
      checkbox.id = 'check-' + wire.id;
      checkbox.addEventListener('change', () => toggleWire(wire.id));
      const swatch = document.createElement('span');
      swatch.className = 'wire-swatch';
      swatch.style.backgroundColor = wire.color;
      const label = document.createElement('label');
      label.className = 'wire-text';
      label.htmlFor = checkbox.id;
      const name = document.createElement('strong');
      name.textContent = wire.label;
      const status = document.createElement('small');
      status.textContent = wire.completed ? 'Complete' : 'Ready to connect';
      label.append(name, status);
      const edit = document.createElement('button');
      edit.className = 'wire-edit';
      edit.textContent = '✎';
      edit.setAttribute('aria-label', 'Edit ' + wire.label);
      edit.addEventListener('click', () => { setMode('edit'); selectWire(wire.id, true); });
      item.append(checkbox, swatch, label, edit);
      list.append(item);
    });
    element('empty-list').hidden = visible.length > 0;
    element('empty-list').textContent = project.wires.length ? 'No connections match this view.' : 'Trace your first wire to start tracking.';
    element('wire-count').textContent = project.wires.length;
  }

  function renderEditor() {
    const wire = project.wires.find(candidate => candidate.id === selectedId);
    element('editor-card').hidden = !wire || mode !== 'edit';
    if (!wire || mode !== 'edit') return;
    if (!element('wire-form').contains(document.activeElement)) {
      element('wire-label').value = wire.label;
      element('wire-color').value = wire.color;
      element('wire-width').value = wire.width;
    }
    element('remove-point').disabled = selectedPoint < 0 || wire.points.length <= 2;
  }

  function render() {
    if (document.activeElement !== element('project-name')) element('project-name').value = project.name;
    element('diagram-name').textContent = project.diagram.name;
    const src = project.diagram.src === EXAMPLE_SOURCE ? EXAMPLE_IMAGE : project.diagram.src;
    if (imageElement.getAttribute('href') !== src) imageElement.setAttribute('href', src);
    imageElement.setAttribute('width', project.diagram.width);
    imageElement.setAttribute('height', project.diagram.height);
    imageElement.style.opacity = project.settings.imageOpacity;
    element('diagram-paper').setAttribute('width', project.diagram.width);
    element('diagram-paper').setAttribute('height', project.diagram.height);
    const complete = project.wires.filter(wire => wire.completed).length;
    const percent = project.wires.length ? Math.round(100 * complete / project.wires.length) : 0;
    element('progress-percent').replaceChildren(document.createTextNode(percent), Object.assign(document.createElement('span'), { textContent: '%' }));
    element('progress-count').textContent = complete + ' of ' + project.wires.length + ' complete';
    element('progress-bar').max = project.wires.length || 1;
    element('progress-bar').value = complete;
    element('progress-message').textContent = project.wires.length && complete === project.wires.length ? 'Every connection checked. Nice work.' : 'A little patience. A great-sounding guitar.';
    element('completed-style').value = project.settings.completedStyle;
    element('image-opacity').value = Math.round(project.settings.imageOpacity * 100);
    element('opacity-label').textContent = Math.round(project.settings.imageOpacity * 100) + '%';
    element('undo-button').disabled = !history.past.length && !draft.length;
    element('redo-button').disabled = !history.future.length || !!draft.length;
    renderWires();
    renderList();
    renderEditor();
  }

  function updateView() {
    svg.setAttribute('viewBox', [view.x, view.y, view.width, view.height].join(' '));
    element('zoom-label').textContent = Math.round(fitView.width / view.width * 100) + '%';
    renderWires();
  }

  function fitDiagram() {
    const padding = Math.max(project.diagram.width, project.diagram.height) * .045;
    fitView = { x: -padding, y: -padding, width: project.diagram.width + padding * 2, height: project.diagram.height + padding * 2 };
    view = { ...fitView };
    updateView();
  }

  function clientToDiagram(clientX, clientY) {
    const point = svg.createSVGPoint();
    point.x = clientX;
    point.y = clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
  }

  function clampPoint(point) {
    return { x: Math.max(0, Math.min(project.diagram.width, point.x)), y: Math.max(0, Math.min(project.diagram.height, point.y)) };
  }

  function zoom(factor, center) {
    const anchor = center || { x: view.x + view.width / 2, y: view.y + view.height / 2 };
    const newWidth = Math.max(fitView.width / 12, Math.min(fitView.width * 4, view.width / factor));
    const ratio = newWidth / view.width;
    view = { x: anchor.x - (anchor.x - view.x) * ratio, y: anchor.y - (anchor.y - view.y) * ratio, width: newWidth, height: view.height * ratio };
    updateView();
  }

  function setMode(nextMode) {
    if (draft.length && nextMode !== 'trace') {
      toast('Finish or cancel your trace before changing modes.');
      return false;
    }
    mode = nextMode;
    selectedPoint = -1;
    document.querySelectorAll('[data-mode]').forEach(button => {
      if (button.tagName === 'BUTTON') button.setAttribute('aria-pressed', String(button.dataset.mode === mode));
    });
    canvas.dataset.mode = mode;
    element('mode-badge').textContent = mode.toUpperCase() + ' MODE';
    element('trace-bar').hidden = mode !== 'trace';
    const hints = { track: 'Tap a traced wire to mark it complete.', trace: 'Tap points along a connection, then finish the wire.', edit: 'Select a wire to edit its points and details.', pan: 'Drag the diagram to move around.' };
    element('mode-hint').textContent = hints[mode];
    render();
    return true;
  }

  function selectWire(identifier, focus = false) {
    selectedId = identifier;
    selectedPoint = -1;
    render();
    if (focus) {
      element('editor-card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      element('wire-label').focus({ preventScroll: true });
      element('wire-label').select();
    }
  }

  function toggleWire(identifier) {
    commit(next => {
      const wire = next.wires.find(candidate => candidate.id === identifier);
      if (wire) wire.completed = !wire.completed;
    });
    const checkbox = element('check-' + identifier);
    if (checkbox) checkbox.focus({ preventScroll: true });
  }

  function activateWire(identifier) {
    if (mode === 'edit') selectWire(identifier);
    else toggleWire(identifier);
  }

  function chooseAt(point) {
    const hits = hitWires(point, project.wires, 9 / svgScale(), mode === 'edit' ? 'show' : project.settings.completedStyle);
    if (!hits.length) { if (mode === 'edit') selectWire(null); return; }
    if (hits.length === 1) { activateWire(hits[0].id); return; }
    const options = element('overlap-options');
    options.replaceChildren();
    hits.forEach(wire => {
      const button = document.createElement('button');
      button.className = 'overlap-option';
      const swatch = document.createElement('span');
      swatch.className = 'wire-swatch';
      swatch.style.backgroundColor = wire.color;
      const name = document.createElement('span');
      name.textContent = wire.label;
      const status = document.createElement('small');
      status.textContent = mode === 'edit' ? 'Edit' : wire.completed ? 'Restore' : 'Complete';
      button.append(swatch, name, status);
      button.addEventListener('click', () => { element('overlap-dialog').close(); activateWire(wire.id); });
      options.append(button);
    });
    element('overlap-dialog').showModal();
  }

  function finishTrace() {
    if (draft.length < 2) return;
    if (project.wires.length >= 1000 || draft.length > 5000 || project.wires.reduce((total, wire) => total + wire.points.length, draft.length) > 50000) { toast('Project wire or point limit reached.'); return; }
    const identifier = 'wire-' + (globalThis.crypto?.randomUUID?.() || Date.now() + '-' + Math.random().toString(36).slice(2));
    const points = draft.map(point => ({ ...point }));
    draft = [];
    selectedId = identifier;
    commit(next => next.wires.push({ id: identifier, label: 'Connection ' + (next.wires.length + 1), color: COLORS[next.wires.length % COLORS.length], width: 5, completed: false, points }));
    setMode('edit');
    selectWire(identifier, true);
    toast('Wire added. Give the connection a name.');
  }

  function undo() {
    if (draft.length) { draft.pop(); render(); return; }
    if (!history.past.length) return;
    const oldDiagram = project.diagram;
    project = history.undo();
    selectedId = null;
    selectedPoint = -1;
    if (oldDiagram.src !== project.diagram.src) fitDiagram();
    persist(); render(); toast('Last change undone.');
  }

  function redo() {
    if (draft.length || !history.future.length) return;
    const oldDiagram = project.diagram;
    project = history.redo();
    selectedId = null;
    selectedPoint = -1;
    if (oldDiagram.src !== project.diagram.src) fitDiagram();
    persist(); render(); toast('Change restored.');
  }

  function confirmAction(title, message, actionLabel = 'Continue') {
    const dialog = element('confirm-dialog');
    element('confirm-title').textContent = title;
    element('confirm-message').textContent = message;
    element('confirm-ok').textContent = actionLabel;
    return new Promise(resolve => {
      function finish(result) {
        dialog.close();
        element('confirm-ok').removeEventListener('click', accept);
        element('confirm-cancel').removeEventListener('click', reject);
        dialog.removeEventListener('cancel', cancel);
        resolve(result);
      }
      const accept = () => finish(true);
      const reject = () => finish(false);
      const cancel = event => { event.preventDefault(); finish(false); };
      element('confirm-ok').addEventListener('click', accept);
      element('confirm-cancel').addEventListener('click', reject);
      dialog.addEventListener('cancel', cancel);
      dialog.showModal();
      element('confirm-cancel').focus();
    });
  }

  async function replaceProject(next, message) {
    if (!(await confirmAction('Replace this workspace?', message + ' Export first to keep a separate backup. This replacement can also be undone.', 'Replace workspace'))) return false;
    draft = [];
    selectedId = null;
    selectedPoint = -1;
    history.commit(next);
    project = cloneProject(history.present);
    persist();
    fitDiagram();
    setMode('track');
    return true;
  }

  function readDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('The selected file could not be read.'));
      reader.readAsDataURL(file);
    });
  }

  function loadImage(source) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth > 20000 || image.naturalHeight > 20000 || image.naturalWidth * image.naturalHeight > 40000000) reject(new Error('Choose a diagram under 40 megapixels and 20,000 pixels per side.'));
        else resolve(image);
      };
      image.onerror = () => reject(new Error('The diagram is not a readable image. Choose a PNG, JPG, WebP, GIF, or valid SVG.'));
      image.src = source === EXAMPLE_SOURCE ? EXAMPLE_IMAGE : source;
    });
  }

  function imageToPNG(image) {
    const bitmap = document.createElement('canvas');
    bitmap.width = image.naturalWidth;
    bitmap.height = image.naturalHeight;
    bitmap.getContext('2d').drawImage(image, 0, 0);
    const source = bitmap.toDataURL('image/png');
    if (source.length > MAX_FILE_BYTES - 500000) throw new Error('The converted diagram is too large. Resize it before uploading.');
    return source;
  }

  async function uploadDiagram(file) {
    if (!file || importBusy) return;
    importBusy = true;
    try {
      if (file.size > 8 * 1024 * 1024) throw new Error('Choose an image smaller than 8 MB.');
      if (!/^image\/(png|jpeg|webp|gif|svg\+xml)$/.test(file.type)) throw new Error('Choose a PNG, JPG, WebP, GIF, or SVG image.');
      let source = await readDataURL(file);
      const image = await loadImage(source);
      if (file.type === 'image/svg+xml') source = imageToPNG(image);
      const next = { schemaVersion: SCHEMA_VERSION, name: file.name.replace(/\.[^.]+$/, '').slice(0, 120) || 'My guitar build', diagram: { src: source, width: image.naturalWidth, height: image.naturalHeight, name: file.name.slice(0, 240) }, settings: { completedStyle: 'fade', imageOpacity: 1 }, wires: [] };
      validateProject(next);
      if (await replaceProject(next, 'This image starts a fresh diagram with no traced wires.')) toast('Diagram uploaded. Choose Trace to draw the wire paths manually.');
    } catch (error) { toast(error.message); }
    finally { importBusy = false; element('diagram-file').value = ''; }
  }

  async function importProject(file) {
    if (!file || importBusy) return;
    importBusy = true;
    try {
      if (file.size > MAX_FILE_BYTES) throw new Error('Choose a project JSON smaller than 12 MB.');
      const next = validateProject(JSON.parse(await file.text()));
      const decoded = await loadImage(next.diagram.src);
      if (decoded.naturalWidth !== next.diagram.width || decoded.naturalHeight !== next.diagram.height) throw new Error('The image dimensions do not match this project.');
      if (await replaceProject(next, 'Import “' + next.name + '” with ' + next.wires.length + ' traced wires.')) toast('Project imported, including diagram and progress.');
    } catch (error) { toast(error instanceof SyntaxError ? 'This file is not valid JSON.' : error.message); }
    finally { importBusy = false; element('project-file').value = ''; }
  }

  async function exportProject() {
    try {
      const portable = cloneProject(project);
      if (portable.diagram.src === EXAMPLE_SOURCE) portable.diagram.src = imageToPNG(await loadImage(EXAMPLE_SOURCE));
      const text = JSON.stringify(portable, null, 2);
      if (new Blob([text]).size > MAX_FILE_BYTES) throw new Error('This project is over the 12 MB export limit. Use a smaller diagram.');
      const url = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
      const link = document.createElement('a');
      link.href = url;
      link.download = (project.name.replace(/[^a-z0-9_-]+/gi, '-').replace(/^-|-$/g, '') || 'guitar-wiring') + '.json';
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      toast('Project exported with its diagram.');
    } catch (error) { toast('Could not export: ' + error.message); }
  }

  svg.addEventListener('pointerdown', event => {
    if (event.button !== 0 && event.button !== 1) return;
    if (event.button === 1) event.preventDefault();
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    svg.setPointerCapture(event.pointerId);
    if (pointers.size === 2) {
      if (gesture?.kind === 'point') project = cloneProject(history.present);
      gesture = null;
      const positions = [...pointers.values()];
      pinch = { distance: Math.hypot(positions[0].x - positions[1].x, positions[0].y - positions[1].y), midpoint: { x: (positions[0].x + positions[1].x) / 2, y: (positions[0].y + positions[1].y) / 2 } };
      touchGesture = true;
      return;
    }
    if (pointers.size > 2 || touchGesture) return;
    const pointIndex = event.target.getAttribute('data-point-index');
    const point = clientToDiagram(event.clientX, event.clientY);
    const kind = mode === 'pan' || spaceHeld || event.button === 1 ? 'pan' : mode === 'edit' && pointIndex !== null ? 'point' : 'tap';
    if (kind === 'point') { selectedPoint = Number(pointIndex); project = cloneProject(project); renderHandles(); }
    gesture = { kind, clientX: event.clientX, clientY: event.clientY, start: point, view: { ...view }, scale: svgScale(), moved: false, shift: event.shiftKey, pointerId: event.pointerId };
    if (kind === 'pan') canvas.classList.add('is-dragging');
  });

  svg.addEventListener('pointermove', event => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size >= 2 && pinch) {
      const positions = [...pointers.values()];
      const midpoint = { x: (positions[0].x + positions[1].x) / 2, y: (positions[0].y + positions[1].y) / 2 };
      const distance = Math.hypot(positions[0].x - positions[1].x, positions[0].y - positions[1].y);
      const anchor = clientToDiagram(pinch.midpoint.x, pinch.midpoint.y);
      zoom(distance / Math.max(1, pinch.distance), anchor);
      view.x -= (midpoint.x - pinch.midpoint.x) / svgScale();
      view.y -= (midpoint.y - pinch.midpoint.y) / svgScale();
      pinch = { distance, midpoint };
      updateView();
      return;
    }
    if (!gesture || gesture.pointerId !== event.pointerId || touchGesture) return;
    const deltaX = event.clientX - gesture.clientX;
    const deltaY = event.clientY - gesture.clientY;
    if (Math.hypot(deltaX, deltaY) > 5) gesture.moved = true;
    if (gesture.kind === 'pan') {
      view.x = gesture.view.x - deltaX / gesture.scale;
      view.y = gesture.view.y - deltaY / gesture.scale;
      updateView();
    } else if (gesture.kind === 'point' && gesture.moved) {
      const wire = project.wires.find(candidate => candidate.id === selectedId);
      if (wire) wire.points[selectedPoint] = clampPoint(clientToDiagram(event.clientX, event.clientY));
      renderWires();
    }
  });

  function endPointer(event, cancelled) {
    pointers.delete(event.pointerId);
    if (svg.hasPointerCapture(event.pointerId)) svg.releasePointerCapture(event.pointerId);
    if (pointers.size < 2) pinch = null;
    if (touchGesture) {
      if (!pointers.size) { touchGesture = false; canvas.classList.remove('is-dragging'); renderWires(); }
      return;
    }
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const action = gesture;
    gesture = null;
    canvas.classList.remove('is-dragging');
    if (action.kind === 'point') {
      if (!cancelled && action.moved) history.commit(project);
      project = cloneProject(history.present);
      persist(); render();
      return;
    }
    if (cancelled || action.moved || action.kind === 'pan') return;
    let point = clientToDiagram(event.clientX, event.clientY);
    if (mode === 'trace') {
      if (point.x < 0 || point.y < 0 || point.x > project.diagram.width || point.y > project.diagram.height) { toast('Add tracing points inside the diagram.'); return; }
      point = clampPoint(point);
      if ((event.shiftKey || action.shift) && draft.length) {
        const previous = draft[draft.length - 1];
        if (Math.abs(point.x - previous.x) > Math.abs(point.y - previous.y)) point.y = previous.y;
        else point.x = previous.x;
      }
      if (draft.length < 5000 && (!draft.length || Math.hypot(point.x - draft[draft.length - 1].x, point.y - draft[draft.length - 1].y) > 1 / svgScale())) draft.push(point);
      render();
    } else if (mode === 'track' || mode === 'edit') chooseAt(point);
  }

  svg.addEventListener('pointerup', event => endPointer(event, false));
  svg.addEventListener('pointercancel', event => endPointer(event, true));
  svg.addEventListener('dblclick', event => {
    if (mode !== 'edit' || !selectedId || event.target.hasAttribute('data-point-index')) return;
    const wire = project.wires.find(candidate => candidate.id === selectedId);
    if (!wire || wire.points.length >= 5000 || project.wires.reduce((total, item) => total + item.points.length, 0) >= 50000) return;
    const nearest = nearestSegment(clientToDiagram(event.clientX, event.clientY), wire);
    if (nearest.distance > 15 / svgScale()) return;
    selectedPoint = nearest.index + 1;
    commit(next => next.wires.find(candidate => candidate.id === selectedId).points.splice(selectedPoint, 0, nearest.point));
  });
  svg.addEventListener('wheel', event => {
    event.preventDefault();
    zoom(Math.exp(-Math.max(-100, Math.min(100, event.deltaY)) * .004), clientToDiagram(event.clientX, event.clientY));
  }, { passive: false });

  document.querySelectorAll('button[data-mode]').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(candidate => candidate.setAttribute('aria-pressed', String(candidate === button)));
    renderList();
  }));
  document.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => element(button.dataset.close).close()));
  element('wire-search').addEventListener('input', renderList);
  element('add-wire-button').addEventListener('click', () => { if (setMode('trace')) canvas.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  element('help-button').addEventListener('click', () => element('help-dialog').showModal());
  element('undo-button').addEventListener('click', undo);
  element('redo-button').addEventListener('click', redo);
  element('zoom-in').addEventListener('click', () => zoom(1.25));
  element('zoom-out').addEventListener('click', () => zoom(.8));
  element('fit-button').addEventListener('click', fitDiagram);
  element('finish-trace').addEventListener('click', finishTrace);
  element('remove-draft-point').addEventListener('click', () => { draft.pop(); render(); });
  element('cancel-trace').addEventListener('click', () => { draft = []; setMode('track'); });
  element('project-name').addEventListener('change', event => { const name = event.target.value.trim(); if (name) commit(next => { next.name = name; }); else event.target.value = project.name; });
  element('completed-style').addEventListener('change', event => commit(next => { next.settings.completedStyle = event.target.value; }));
  element('image-opacity').addEventListener('input', event => { imageElement.style.opacity = Number(event.target.value) / 100; element('opacity-label').textContent = event.target.value + '%'; });
  element('image-opacity').addEventListener('change', event => commit(next => { next.settings.imageOpacity = Number(event.target.value) / 100; }));
  element('wire-form').addEventListener('submit', event => {
    event.preventDefault();
    const label = element('wire-label').value.trim();
    const width = Number(element('wire-width').value);
    if (!label || !Number.isFinite(width) || width < 1 || width > 30) { toast('Enter a wire name and a width from 1 to 30.'); return; }
    commit(next => {
      const wire = next.wires.find(candidate => candidate.id === selectedId);
      if (wire) { wire.label = label; wire.color = element('wire-color').value; wire.width = width; }
    });
    toast('Wire details saved.');
  });
  element('close-editor').addEventListener('click', () => { selectedId = null; setMode('track'); });
  element('remove-point').addEventListener('click', () => {
    const wire = project.wires.find(candidate => candidate.id === selectedId);
    if (!wire || selectedPoint < 0 || wire.points.length <= 2) return;
    const index = selectedPoint;
    selectedPoint = -1;
    commit(next => next.wires.find(candidate => candidate.id === selectedId).points.splice(index, 1));
  });
  element('delete-wire').addEventListener('click', async () => {
    const identifier = selectedId;
    if (!identifier) return;
    if (await confirmAction('Delete this wire?', 'The traced path and its checklist entry will be removed. You can undo this.', 'Delete wire')) {
      selectedId = null;
      commit(next => { next.wires = next.wires.filter(wire => wire.id !== identifier); });
    }
  });
  element('reset-progress').addEventListener('click', async () => {
    if (await confirmAction('Reset all progress?', 'All connections will be marked incomplete. Paths and details stay in your project. You can undo this.', 'Reset progress')) commit(next => next.wires.forEach(wire => { wire.completed = false; }));
  });
  element('upload-button').addEventListener('click', () => element('diagram-file').click());
  element('diagram-file').addEventListener('change', event => uploadDiagram(event.target.files[0]));
  element('import-button').addEventListener('click', () => element('project-file').click());
  element('project-file').addEventListener('change', event => importProject(event.target.files[0]));
  element('export-button').addEventListener('click', exportProject);
  element('example-button').addEventListener('click', async () => { if (await replaceProject(makeExample(), 'Load the practice diagram and its eight editable wire paths.')) toast('Example loaded. Tap a connection to try tracking it.'); });
  canvas.addEventListener('dragover', event => { event.preventDefault(); });
  canvas.addEventListener('drop', event => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (!file) return;
    if (/\.json$/i.test(file.name)) importProject(file); else uploadDiagram(file);
  });
  imageElement.addEventListener('error', () => toast('Diagram image could not be displayed. Import a backup or upload the diagram again.'));
  window.addEventListener('resize', renderWires);
  window.addEventListener('blur', () => { spaceHeld = false; });
  document.addEventListener('keydown', event => {
    const typing = /^(TEXTAREA|SELECT)$/.test(event.target.tagName) || (event.target.tagName === 'INPUT' && !['checkbox', 'range', 'color', 'button'].includes(event.target.type)) || event.target.isContentEditable;
    if (typing || document.querySelector('dialog[open]')) return;
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); if (event.shiftKey) redo(); else undo(); }
    else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); redo(); }
    else if (event.code === 'Space') { event.preventDefault(); spaceHeld = true; }
    else if (event.key === 'Enter' && mode === 'trace') { event.preventDefault(); finishTrace(); }
    else if (event.key === 'Escape') { draft = []; setMode('track'); }
    else if (event.key === '+' || event.key === '=') zoom(1.25);
    else if (event.key === '-') zoom(.8);
  });
  document.addEventListener('keyup', event => { if (event.code === 'Space') spaceHeld = false; });
  window.addEventListener('beforeunload', event => { if (draft.length) { event.preventDefault(); event.returnValue = ''; } });
  render();
  fitDiagram();
  if (restoreError) { element('save-status').textContent = 'Saved workspace unavailable'; toast(restoreError); }
})();
