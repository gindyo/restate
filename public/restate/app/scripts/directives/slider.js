(function() {
  this.angular.module('RestateDirectives').directive('reSlider', function() {
    return {
      restrict: 'AC',
      template: '\
    	<div class="re-slider-element"></div>\
    ',
      link: function(scope, element, attrs) {
        return $('.re-slider-element').slider();
      }
    };
  });

}).call(this);
