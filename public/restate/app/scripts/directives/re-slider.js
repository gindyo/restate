(function() {
  this.angular.module('RestateDirectives').directive('reSlider', function() {
    return {
      restrict: 'AC',
      scope: {
        min: '@',
        max: '@',
        sliderChange: '&'
      },
      compile: function(element, attrs, link) {
        var high, low;
        low = document.createElement('span');
        low.innerHTML = '{{slidingMin}}';
        low.setAttribute('style', 'position: absolute; left: -20px; bottom: -20px');
        element.prepend(low);
        high = document.createElement('span');
        high.innerHTML = '{{slidingMax}}';
        high.setAttribute('style', 'position: absolute; right: -20px; bottom: -20px');
        element.prepend(high);
        return link = function(scope, element, attrs) {
          var currentMaxValue, currentMinValue,
            _this = this;
          this.rangeWidth = 0;
          scope.$watch('min + max', function() {
            return _this.rangeWidth = scope.max - scope.min;
          });
          element.slider();
          element.slider({
            range: true,
            values: [1, 100]
          });
          currentMinValue = function() {
            if (element.slider('values')[0] === 0) {
              return scope.min;
            } else {
              return Math.ceil((scope.max * element.slider('values')[0]) / 100);
            }
          };
          currentMaxValue = function() {
            return Math.ceil((scope.max * element.slider('values')[1]) / 100);
          };
          return element.slider({
            stop: function() {
              return scope.sliderChange({
                values: {
                  lo: currentMinValue(),
                  hi: currentMaxValue()
                }
              });
            }
          });
        };
      }
    };
  });

}).call(this);
