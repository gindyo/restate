angular.module('RestateDirectives', [])
  .directive 'area', ->
    restrict: 'AC'
    link: (scope, element, attr)-> 
      scope.area_id = attr.areaId
     