(function() {
  describe('ResultsCtrl', function() {
    var controller, scope,
      _this = this;
    controller = null;
    scope = {};
    beforeEach(module('Results'));
    return beforeEach(inject(function($injector) {
      var area, server;
      scope = $injector.get('$rootScope').$new;
      server = {
        area_units: function(callback) {
          return callback('i was called');
        }
      };
      area = {
        set_units: function() {
          return 'set_units was called';
        },
        get_units: function() {
          return 'get_units was called';
        }
      };
      return controller = $injector.get('$controller')('ResultsCtrl', {
        $scope: scope,
        server: server,
        area: area
      });
    }));
  });

}).call(this);
