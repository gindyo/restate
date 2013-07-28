@angular.module('RestateDirectives')
  .directive 'reSlider', ->
    restrict: 'AC'
    
    scope: {
      min: '@'
      max: '@'
      ngModelHi: '='
      ngModelLo: '='
    }
    compile: (element, attrs, link)->
      low = document.createElement('span')
      low.innerHTML = '{{slidingMin}}'
      low.setAttribute('style', 'position: absolute; left: -20px; bottom: -20px')
      element.prepend(low)
      high = document.createElement('span')
      high.innerHTML = '{{slidingMax}}'
      high.setAttribute('style', 'position: absolute; right: -20px; bottom: -20px')
      element.prepend(high)
      link = (scope, element, attrs)->
        @rangeWidth = 0
        scope.$watch 'min + max', =>
          @rangeWidth = scope.max - scope.min
        element.slider()
        element.slider
          range: true
          values: [1, 100]
        currentMinValue = -> 
          if element.slider('values')[0] == 0
            return scope.min
          else
            Math.ceil((scope.max * element.slider('values')[0]) / 100)
        currentMaxValue = -> Math.ceil((scope.max * element.slider('values')[1]) / 100)
        
        slider_low = ->
          scope.$apply ->
            scope.ngModelLo = currentMinValue()
        slider_high = ->
          scope.$apply ->
            scope.ngModelHi = currentMaxValue()
        element.slider
          stop: ->
            slider_low()
            slider_high()
          
     
