(function() {
  this.angular.module('RestateDirectives').directive('reSlider', function() {
    return {
      restrict: 'AC',
      template: '\
    	<div class="re-slider-element"></div>\
    ',
      scope: {
        min: '@',
        max: '@',
        ngModelHi: '=',
        ngModelLo: '='
      },
      link: function(scope, element, attrs) {
        var slider_high, slider_low,
          _this = this;
        this.rangeWidth = 0;
        scope.$watch('min + max', function() {
          return _this.rangeWidth = scope.max - scope.min;
        });
        element.slider();
        element.slider({
          range: true,
          values: [0, 100]
        });
        slider_low = function() {
          return scope.$apply(function() {
            return scope.ngModelLo = Math.ceil((_this.rangeWidth * element.slider('values')[0]) / 100);
          });
        };
        slider_high = function() {
          return scope.$apply(function() {
            return scope.ngModelHi = Math.ceil((_this.rangeWidth * element.slider('values')[1]) / 100);
          });
        };
        return element.slider({
          stop: function() {
            slider_low();
            return slider_high();
          },
          slide: function() {}
        });
      }
    };
  });

}).call(this);
