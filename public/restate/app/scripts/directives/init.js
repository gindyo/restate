(function() {
  angular.module('RestateDirectives', []).directive('area', function() {
    return {
      restrict: 'AC',
      link: function(scope, element, attr) {
        return scope.area_id = attr.areaId;
      }
    };
  });

}).call(this);
