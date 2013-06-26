(function() {
  angular.module('Results').directive('area', function() {
    return {
      restrict: 'AE',
      link: function(scope, element, attr) {
        return scope.area_id = attr.areaId;
      }
    };
  });

}).call(this);
