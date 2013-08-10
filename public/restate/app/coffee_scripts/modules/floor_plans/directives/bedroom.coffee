@angular.module('FloorPlan')
  .directive 'bedroom', ->
    restrict: 'AC'
    scope: {
    }
    compile: (element, attrs, link)->
      
      link = (scope, element, attrs)->
        
