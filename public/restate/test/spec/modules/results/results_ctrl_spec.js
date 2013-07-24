(function() {
  describe('ResultsCtrl', function() {
    var controller, scope,
      _this = this;
    controller = null;
    scope = {};
    beforeEach(module('Results'));
    beforeEach(inject(function($injector) {
      var server;
      scope = $injector.get('$rootScope').$new;
      server = {};
      return controller = $injector.get('$controller')('ResultsCtrl', {
        $scope: scope,
        server: server
      });
    }));
    return it('gets area_units from server', function() {
      return expect(scope.area_units).toEqual('i was called');
    });
  });

}).call(this);
