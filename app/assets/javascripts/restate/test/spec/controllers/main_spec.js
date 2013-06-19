(function() {
  describe('MainCtrl', function() {
    var controller, scope,
      _this = this;
    controller = null;
    scope = {};
    beforeEach(module('HomePage'));
    beforeEach(inject(function($injector) {
      var server;
      scope = $injector.get('$rootScope').$new;
      server = {
        all_areas: function(callback) {
          return callback('i was called');
        }
      };
      return controller = $injector.get('$controller')('MainCtrl', {
        $scope: scope,
        server: server
      });
    }));
    return it('gets all_areas from server', function() {
      return expect(scope.all_areas).toEqual('i was called');
    });
  });

}).call(this);
