(function() {
  this.angular.module('RestateDirectives').directive('reDatepicker', function() {
    return {
      restrict: 'AC',
      scope: {
        startDate: '@',
        endDate: '@',
        sliderChange: '&'
      },
      compile: function(element, attrs, link) {
        var datepicker;
        datepicker = document.createElement('div');
        angular.element(datepicker).datepicker(function() {
          return {
            numberOfMonts: 3
          };
        });
        element.append(datepicker);
        return link = function(scope, element, attrs) {
          return console.log('hi');
        };
      }
    };
  });

}).call(this);
