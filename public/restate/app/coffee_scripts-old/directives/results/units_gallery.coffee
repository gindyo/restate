@angular.module('Results')
  .directive 'unitsGallery', ->
    restrict: 'AC'
    scope: {
      units: '='
      openUnit: '&'
    }
    template: '
      <div ng-repeat="unit in page_units" class = "units_gallery_inner" style="margin: 5px; float: left">
        <div unit="unit" ng-click = "open_unit"></div>
      </div>
    '

    link: (scope, element, attrs)->
      scope.$watch 'units',  ->
       scope.page_units = scope.units

       
       