(function() {
  describe('server_service', function() {
    var backEnd, server;
    server = {};
    backEnd = {};
    beforeEach(module('Server'));
    beforeEach(inject(function($injector) {
      server = $injector.get('server');
      return backEnd = $injector.get('$httpBackend');
    }));
    it('gets area 1', function() {
      var callback;
      backEnd.expectGET('/areas/1/units').respond(200, '');
      callback = function() {
        return 'blabla';
      };
      return server.area_units(1, callback);
    });
    it('gets all areas', function() {
      backEnd.expectGET('/areas/all').respond(200, 'got it');
      return server.all_areas(function(data) {
        return data;
      });
    });
    return afterEach(function() {});
  });

}).call(this);
