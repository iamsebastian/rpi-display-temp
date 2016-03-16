define('temp-controller/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'temp-controller/tests/helpers/start-app', 'temp-controller/tests/helpers/destroy-app'], function (exports, _qunit, _tempControllerTestsHelpersStartApp, _tempControllerTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _tempControllerTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _tempControllerTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});