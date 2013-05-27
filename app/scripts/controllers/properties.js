(function() {
  angular.module('realEstateApp').controller('PropertyCtrl', function($scope, PropertySupplier, $routeParams, $location) {
    var query;

    query = PropertySupplier.find($routeParams.id);
    $scope.property = query.property;
    if (query.property_found === false) {
      return $location.path('/not_found');
    }
  });

}).call(this);
