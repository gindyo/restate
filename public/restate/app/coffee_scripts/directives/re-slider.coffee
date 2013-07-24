@angular.module('RestateDirectives')
  .directive 'reSlider', ->
    restrict: 'AC'
    template: '
    	<div class="re-slider-element"></div>
    '
    scope: {
      min: '@'
      max: '@'
      ngModelHi: '='
      ngModelLo: '='
    }
    link: (scope, element, attrs)->
      @rangeWidth = 0
      scope.$watch 'min + max', =>
        @rangeWidth = scope.max - scope.min
      element.slider()
      element.slider
        range: true
        values: [0, 100]
      slider_low = =>
        scope.$apply =>
          scope.ngModelLo = Math.ceil (@rangeWidth * element.slider('values')[0]) / 100
      slider_high = =>
        scope.$apply =>
          scope.ngModelHi = Math.ceil (@rangeWidth * element.slider('values')[1]) / 100
      element.slider
        stop: ->
            slider_low()
            slider_high()
        slide: ->
          #console.log  element.slider('values')[1]
    #compile: (element)->
