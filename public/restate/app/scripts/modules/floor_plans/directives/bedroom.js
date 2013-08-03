(function() {
  this.angular.module('FloorPlan').directive('bedroom', function() {
    return {
      restrict: 'AC',
      scope: {},
      compile: function(element, attrs, link) {
        return link = function(scope, element, attrs) {
          return console.log(scope.options43);
        };
      }
    };
  });

}).call(this);
