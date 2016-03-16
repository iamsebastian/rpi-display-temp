define('temp-controller/tests/test-helper', ['exports', 'temp-controller/tests/helpers/resolver', 'ember-qunit'], function (exports, _tempControllerTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_tempControllerTestsHelpersResolver['default']);
});