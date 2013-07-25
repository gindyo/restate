(function() {
  describe('ResultsCtrl', function() {
    var controller, scope,
      _this = this;
    controller = null;
    scope = {};
    beforeEach(module('Results'));
    return beforeEach(inject(function($injector) {
      var server;
      scope = $injector.get('$rootScope').$new;
      server = {};
      return controller = $injector.get('$controller')('ResultsCtrl', {
        $scope: scope,
        server: server
      });
    }));
  });

}).call(this);
