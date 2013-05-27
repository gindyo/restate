describe "PropertyCtrl", ->
  $scope = null
  controller = null
  location = null
  property_supplier = null
  
  initCtrl = ()->
    controller "PropertyCtrl", 
      $scope: $scope, 
      PropertySupplier: property_supplier
      $routeParams: {id: 0}
      $location: location
  
  beforeEach module 'realEstateApp'

  beforeEach inject ($injector, $controller, $rootScope, $location, PropertySupplier) ->
    $scope = $rootScope.$new()
    controller = $controller 
    location = $location
    property_supplier = PropertySupplier

  it 'finds a property', ->
    spyOn(property_supplier, 'find').andReturn {property_found: true, property: {price: '$500'}}
    initCtrl()
    expect($scope.property.price).toBe '$500'
  
  it 'does not find a property', ->
    spyOn location, 'path'
    spyOn(property_supplier, 'find').andReturn {property_found: false}
    initCtrl()
    expect(location.path).toHaveBeenCalledWith '/not_found'