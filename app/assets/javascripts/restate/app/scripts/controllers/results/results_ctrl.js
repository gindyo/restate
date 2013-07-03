(function() {
  angular.module('Results').controller('ResultsCtrl', function($scope, server, $filter) {
    var limit_to_filter, order_by_filter;
    $scope.area_units = [];
    $scope.reverse_it = false;
    $scope.num_units = 10;
    $scope.current_page = 1;
    $scope.no_of_pages = 5;
    $scope.max_pages = 10;
    $scope.order_by = 'price';
    $scope.order_direction = 'up';
    limit_to_filter = $filter('limitTo');
    order_by_filter = $filter('orderBy');
    $scope.$watch('area_id', function() {
      return server.area_units($scope.area_id, function(data) {
        return $scope.area_units = data;
      });
    });
    $scope.$watch('area_units', function() {
      return $scope.units = $scope.area_units;
    });
    $scope.$watch('num_units', function() {
      return $scope.units = $scope.area_units.slice(0, +($scope.num_units - 1) + 1 || 9e9);
    });
    $scope.reverse_order = function() {
      $scope.reverse_it = !$scope.reverse_it;
      if ($scope.reverse_it) {
        return $scope.order_direction = 'down';
      } else {
        return $scope.order_direction = 'up';
      }
    };
    return $scope.$watch('[order_by, reverse_it] | json', function() {
      var ordered_units;
      ordered_units = order_by_filter($scope.area_units, $scope.order_by, $scope.reverse_it);
      return $scope.units = limit_to_filter(ordered_units, $scope.num_units);
    });
  });

}).call(this);
