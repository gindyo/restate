(function() {
  this.angular.module('RestateDirectives').directive('reDatepicker', function() {
    return {
      restrict: 'AC',
      scope: {
        options: '='
      },
      template: '<div ui-date="options" name="availability"> </div>'
    };
  });

}).call(this);
