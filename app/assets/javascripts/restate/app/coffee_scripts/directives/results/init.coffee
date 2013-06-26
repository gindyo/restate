angular.module('Results')
  .directive 'area', ->
    restrict: 'AE'
    link: (scope, element, attr)-> 
      scope.area_id = attr.areaId
     