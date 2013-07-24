(function() {
  describe('Units', function() {
    var server, units
    units = {};
    server = {}
      
    beforeEach(module('Results'));
    
    beforeEach(function() {
      server = sinon.stub({area_units: function(){return 'i was called'}}) 
      module(function($provide){
        $provide.value('server', server)
      })
      inject(function(Units){
        units = Units
      })
    });
    

    it('loads units', function() {
      spyOn(server, 'area_units');
      expect(units.all).toEqual({});
      units.load(1)
      expect(server.area_units).toHaveBeenCalledWith(1, function(data) {});
      
    });
  });

}).call(this);
