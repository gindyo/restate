(function() {
  describe("PropertyCtrl", function() {
    var $scope, controller, initCtrl, location, property_supplier;

    $scope = null;
    controller = null;
    location = null;
    property_supplier = null;
    initCtrl = function() {
      return controller("PropertyCtrl", {
        $scope: $scope,
        PropertySupplier: property_supplier,
        $routeParams: {
          id: 0
        },
        $location: location
      });
    };
    beforeEach(module('realEstateApp'));
    beforeEach(inject(function($injector, $controller, $rootScope, $location, PropertySupplier) {
      $scope = $rootScope.$new();
      controller = $controller;
      location = $location;
      return property_supplier = PropertySupplier;
    }));
    it('finds a property', function() {
      spyOn(property_supplier, 'find').andReturn({
        property_found: true,
        property: {
          price: '$500'
        }
      });
      initCtrl();
      return expect($scope.property.price).toBe('$500');
    });
    return it('does not find a property', function() {
      spyOn(location, 'path');
      spyOn(property_supplier, 'find').andReturn({
        property_found: false
      });
      initCtrl();
      return expect(location.path).toHaveBeenCalledWith('/not_found');
    });
  });

}).call(this);
