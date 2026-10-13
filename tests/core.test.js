const test = require('node:test');
const assert = require('node:assert/strict');
const { makeExample, validateProject, cloneProject, closestOnSegment, nearestSegment, hitWires, ProjectHistory } = require('../script.js');

test('example is a valid project with eight manually defined connections', () => {
  const project = makeExample();
  assert.deepEqual(validateProject(project), project);
  assert.equal(project.wires.length, 8);
  assert.equal(project.wires.filter(wire => wire.completed).length, 0);
});

test('project cloning isolates editable paths, settings, and diagram metadata', () => {
  const original = makeExample();
  const copy = cloneProject(original);
  copy.wires[0].points[0].x = 1;
  copy.settings.completedStyle = 'hide';
  copy.diagram.name = 'Changed';
  assert.equal(original.wires[0].points[0].x, 265);
  assert.equal(original.settings.completedStyle, 'fade');
  assert.notEqual(original.diagram.name, copy.diagram.name);
});

test('validation rejects unsupported schema versions and missing project data', () => {
  for (const input of [null, {}, { schemaVersion: 999 }, { ...makeExample(), name: '' }]) assert.throws(() => validateProject(input));
});

test('validation strips unrelated fields and trims names without parsing HTML', () => {
  const project = makeExample();
  project.extra = 'discard me';
  project.name = '  My build  ';
  project.wires[0].label = '<img src=x onerror=alert(1)>';
  const normalized = validateProject(project);
  assert.equal(normalized.name, 'My build');
  assert.equal(normalized.extra, undefined);
  assert.equal(normalized.wires[0].label, '<img src=x onerror=alert(1)>');
});

test('validation rejects remote image URLs and executable SVG data', () => {
  for (const source of ['https://example.com/image.png', 'javascript:alert(1)', 'data:image/svg+xml;base64,PHN2Zz4=']) {
    const project = makeExample();
    project.diagram.src = source;
    assert.throws(() => validateProject(project), /Diagram must/);
  }
});

test('validation accepts embedded raster data and empty checklists', () => {
  const project = makeExample();
  project.diagram.src = 'data:image/png;base64,aGVsbG8=';
  project.wires = [];
  assert.equal(validateProject(project).wires.length, 0);
});

test('validation rejects coordinates outside the diagram and nonfinite values', () => {
  for (const invalid of [-1, 1001, Infinity, NaN, '123']) {
    const project = makeExample();
    project.wires[0].points[0].x = invalid;
    assert.throws(() => validateProject(project), /coordinates/);
  }
});

test('validation rejects duplicate IDs, invalid colors, widths, and completion types', () => {
  const mutations = [
    project => { project.wires[1].id = project.wires[0].id; },
    project => { project.wires[0].color = 'url(https://example.com)'; },
    project => { project.wires[0].width = 0; },
    project => { project.wires[0].completed = 'false'; },
    project => { project.wires[0].points = [{ x: 1, y: 1 }]; }
  ];
  for (const mutate of mutations) {
    const project = makeExample();
    mutate(project);
    assert.throws(() => validateProject(project));
  }
});

test('validation enforces image, wire, and point limits', () => {
  const image = makeExample();
  image.diagram.width = 20001;
  assert.throws(() => validateProject(image), /dimensions/);
  const wires = makeExample();
  wires.wires = Array.from({ length: 1001 }, () => wires.wires[0]);
  assert.throws(() => validateProject(wires), /1,000 wires/);
  const points = makeExample();
  points.wires[0].points = Array.from({ length: 5001 }, () => ({ x: 1, y: 1 }));
  assert.throws(() => validateProject(points), /5,000 points/);
});

test('closest point handles endpoints and zero-length segments', () => {
  assert.deepEqual(closestOnSegment({ x: 5, y: 4 }, { x: 0, y: 0 }, { x: 10, y: 0 }), { point: { x: 5, y: 0 }, distance: 4 });
  assert.deepEqual(closestOnSegment({ x: 15, y: 0 }, { x: 0, y: 0 }, { x: 10, y: 0 }), { point: { x: 10, y: 0 }, distance: 5 });
  assert.equal(closestOnSegment({ x: 3, y: 4 }, { x: 0, y: 0 }, { x: 0, y: 0 }).distance, 5);
});

test('overlap hit testing returns every wire at a crossing', () => {
  const wires = [
    { id: 'horizontal', width: 2, completed: false, points: [{ x: 0, y: 50 }, { x: 100, y: 50 }] },
    { id: 'vertical', width: 2, completed: false, points: [{ x: 50, y: 0 }, { x: 50, y: 100 }] }
  ];
  assert.equal(hitWires({ x: 50, y: 50 }, wires, 4, 'fade').length, 2);
  assert.deepEqual(hitWires({ x: 10, y: 50 }, wires, 4, 'fade').map(wire => wire.id), ['horizontal']);
  assert.equal(nearestSegment({ x: 80, y: 55 }, wires[0]).index, 0);
});

test('hidden completed wires do not intercept tracking clicks', () => {
  const project = makeExample();
  project.wires[0].completed = true;
  assert.equal(hitWires({ x: 300, y: 167 }, project.wires, 2, 'hide').length, 0);
  assert.equal(hitWires({ x: 300, y: 167 }, project.wires, 2, 'fade')[0].id, project.wires[0].id);
});

test('undo and redo restore completion without affecting other wires', () => {
  const history = new ProjectHistory(makeExample());
  const next = cloneProject(history.present);
  next.wires[0].completed = true;
  history.commit(next);
  assert.equal(history.undo().wires[0].completed, false);
  assert.equal(history.redo().wires[0].completed, true);
  assert.equal(history.present.wires[1].completed, false);
});

test('history isolates snapshots from subsequent point mutations', () => {
  const history = new ProjectHistory(makeExample());
  const next = cloneProject(history.present);
  next.wires[0].points[0].x = 123;
  history.commit(next);
  next.wires[0].points[0].x = 999;
  assert.equal(history.present.wires[0].points[0].x, 123);
  assert.equal(history.undo().wires[0].points[0].x, 265);
});

test('new edits clear redo, unchanged saves do not consume history', () => {
  const history = new ProjectHistory(makeExample());
  assert.equal(history.commit(cloneProject(history.present)), false);
  const next = cloneProject(history.present);
  next.name = 'Another build';
  history.commit(next);
  history.undo();
  const edited = cloneProject(history.present);
  edited.wires.pop();
  history.commit(edited);
  assert.equal(history.future.length, 0);
  assert.equal(history.redo().wires.length, 7);
});

test('history caps memory and undoes entire project replacement', () => {
  const history = new ProjectHistory(makeExample(), 3);
  for (let index = 0; index < 6; index++) {
    const next = cloneProject(history.present);
    next.name = 'Build ' + index;
    history.commit(next);
  }
  assert.equal(history.past.length, 3);
  const replacement = cloneProject(history.present);
  replacement.wires = [];
  replacement.diagram.name = 'Uploaded picture';
  history.commit(replacement);
  assert.equal(history.undo().wires.length, 8);
  assert.equal(history.redo().wires.length, 0);
});
