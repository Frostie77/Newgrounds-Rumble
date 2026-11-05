// Exercise the production bridge without a browser or game download.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '../app/src/main/assets/www/index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const events = [], callbacks = {};
let suspended = false;
const api = {load: async () => {}, suspend: () => {suspended = true;}, resume: () => {suspended = false;}};
const player = {ruffle: () => api, focus: () => {}, dispatchEvent: e => events.push(e)};
const nodes = {
  game: {appendChild: () => {}, style: {}, getBoundingClientRect: () => ({width:650,height:450})},
  status: {remove: () => {}, textContent: ''}
};
const context = vm.createContext({
  window: {RufflePlayer: {newest: () => ({createPlayer: () => player})}, addEventListener: (n,f) => {callbacks[n] = f;}},
  document: {getElementById: id => nodes[id], addEventListener: () => {}, hidden: false},
  KeyboardEvent: class {constructor(type, args) {this.type = type; Object.assign(this,args);}},
  innerWidth: 1300, innerHeight: 900, console, setTimeout, clearTimeout, setInterval, clearInterval
});
vm.runInContext(script, context, {filename:'production-index.html'});
const bridge = context.window;
const count = (code, type) => events.filter(e => e.code === code && e.type === type).length;
(async () => {
  bridge.rumbleSetMenuPaused(true);
  await callbacks.load();
  assert(suspended, 'Menu opened during load must pause the new runtime');
  bridge.rumbleSetMenuPaused(false);
  assert(!suspended);
  bridge.rumbleKey('jump', true, 'face');
  bridge.rumbleKey('up', true, 'stick');
  bridge.rumbleKey('jump', false, 'face');
  assert.equal(count('ArrowUp','keyup'),0, 'Stick must retain jump after face release');
  bridge.rumbleKey('up', false, 'stick');
  assert.equal(count('ArrowUp','keydown'),1);
  assert.equal(count('ArrowUp','keyup'),1);
  bridge.rumbleKey('light',true,'controller');
  bridge.rumbleKey('light',true,'touch');
  await new Promise(r => setTimeout(r,650));
  assert.equal(count('KeyS','keydown'),1, 'Held attack must not create synthetic repeat presses');
  bridge.rumbleKey('light',false,'touch');
  assert.equal(count('KeyS','keyup'),0);
  bridge.rumbleSetMenuPaused(true);
  assert.equal(count('KeyS','keyup'),1, 'Opening settings must release the last held attack');
  assert(suspended);
  const pausedCount = events.length;
  bridge.rumbleKey('heavy',true,'ignored');
  assert.equal(events.length,pausedCount);
  bridge.rumbleSetBackgroundPaused(true);
  bridge.rumbleSetMenuPaused(false);
  assert(suspended, 'Closing settings while backgrounded must leave runtime paused');
  bridge.rumbleSetBackgroundPaused(false);
  assert(!suspended);
  assert.equal(events.length,pausedCount, 'Resume must not replay stale held inputs');
  for (const [id,code] of [['heavy','KeyD'],['block','KeyA'],['pause','KeyP'],['confirm','Space']]) {
    bridge.rumbleKey(id,true,'controller');
    bridge.rumbleKey(id,false,'controller');
    assert.equal(count(code,'keydown'),1,id);
    assert.equal(count(code,'keyup'),1,id);
  }
  bridge.rumbleKey('left',true,'stick');
  bridge.rumbleKey('block',true,'touch');
  bridge.rumbleSetBackgroundPaused(true);
  assert.equal(count('ArrowLeft','keyup'),1);
  assert.equal(count('KeyA','keyup'),2);
  assert(suspended);
  bridge.rumbleSetBackgroundPaused(false);
  const before = events.length;
  bridge.rumbleKey('unknown',true,'invalid');
  bridge.rumbleClearKeys();
  assert.equal(events.length,before);
  bridge.rumbleSetDisplayMode('stretch');
  assert.equal(nodes.game.style.transform,'scale(2,2)');
  bridge.rumbleSetDisplayMode('original');
  assert.equal(nodes.game.style.transform,'');
  console.log('PASS: production input bridge: jump/stick overlap, held attacks, touch/controller overlap, menu/background lifecycle, all action keys and display modes.');
})().catch(e => {console.error(e);process.exitCode = 1;});
