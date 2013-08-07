(function() {
  var Results;

  Results = angular.module('Results', ['Server']);

  angular.module('Results').service('unitsCache', function() {
    var area, units;
    units = null;
    area = null;
    return {
      area: area,
      units: units
    };
  });

  Results.controller('ResultsCtrl', function($scope, server, units, $routeParams, unitsCache) {
    var updatePage;
    $scope.slidingMin = 0;
    $scope.slidingMax = 0;
    $scope.showProgressBar = function() {
      return !unitsCache.units || unitsCache.area !== $routeParams.id;
    };
    if (!unitsCache.units || unitsCache.area !== $routeParams.id) {
      unitsCache.units = new units();
      unitsCache.area = $routeParams.id;
    }
    $scope.units = unitsCache.units;
    $scope.filters = $scope.units.filters;
    $scope.pagination = $scope.units.pagination;
    $scope.units.applyFilters();
    if (!$scope.units.unitsLoaded()) {
      $scope.units.load(unitsCache.area);
    }
    $scope.$watch('units.filters.inRangeIndexes[0] | json', function() {
      $scope.currentPage = $scope.units.currentPage();
      return $scope.units.applyFilters();
    });
    $scope.bathroomsSliderChange = function(values) {
      $scope.filters.ranges.bathrooms.current[0] = values.lo;
      $scope.filters.ranges.bathrooms.current[1] = values.hi;
      $scope.units.applyFilters();
      return updatePage();
    };
    $scope.priceSliderChange = function(values) {
      $scope.units.filters.ranges.price.current[0] = $scope.filters.ranges.price.current[0] = values.lo;
      $scope.filters.ranges.price.current[1] = values.hi;
      $scope.units.applyFilters();
      return updatePage();
    };
    $scope.bedroomsSliderChange = function(values) {
      $scope.filters.ranges.bedrooms.current[0] = values.lo;
      $scope.filters.ranges.bedrooms.current[1] = values.hi;
      $scope.units.applyFilters();
      return updatePage();
    };
    updatePage = function() {
      return $scope.$apply(function() {
        return $scope.currentPage = $scope.units.currentPage();
      });
    };
    $scope.$watch('pagination.currentPage + pagination.numPerPage', function() {
      console.log('helll');
      return $scope.currentPage = $scope.units.currentPage();
    });
    $scope.$watch('units.filters.orderBy', function() {
      $scope.units.resort();
      return $scope.currentPage = $scope.units.currentPage();
    });
    $scope.changePage = function(pNum) {
      $scope.pagination.currentPage = pNum;
      return $scope.currentPage = $scope.units.page(pNum);
    };
    return $scope.reverseOrder = function() {
      $scope.filters.reverseIt = !$scope.filters.reverseIt;
      $scope.units.resort();
      $scope.units.applyFilters();
      return $scope.currentPage = $scope.units.currentPage();
    };
  });

}).call(this);
