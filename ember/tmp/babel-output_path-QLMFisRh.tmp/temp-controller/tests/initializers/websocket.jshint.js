define('temp-controller/tests/initializers/websocket.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - initializers/websocket.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/websocket.js should pass jshint.');
  });
});