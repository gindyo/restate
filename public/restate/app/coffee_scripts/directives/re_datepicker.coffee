@angular.module('RestateDirectives')
  .directive 'reDatepicker', ->
    restrict: 'AC'
    
    scope: {
      options: '='
    }
    template: '<div ui-date="options" name="availability"> </div>' 
    # compile: (element, attrs, link)->
    #   datepicker = document.createElement('div')
    #   datepicker.setAttribute('ui-date', '{{options}}')
    #   datepicker.setAttribute('name', 'availability')
    #   element.append datepicker
    #   link = (scope, element, attrs)->
    #     console.log scope.options