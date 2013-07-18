@angular.module('Results')
  .directive 'unitsGallery', ->
    restrict: 'AC'
    scope: {
      units: '='
      openUnit: '&'
    }
    template: '
      <div ng-repeat="unit in page_units" class = "units_gallery_inner" style="margin: 5px; float: left">
        <div unit="unit" on-unit-clicked = "open_unit"></div>
      </div>
    '

    link: (scope, element, attrs)->
      scope.$watch 'units',  ->
        $('.units_gallery_inner').css('display', 'none')
        $('.units_gallery_inner').css('display', 'block') if scope.units.length > 0
        scope.page_units = scope.units

       
       