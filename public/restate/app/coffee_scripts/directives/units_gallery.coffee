@angular.module('RestateDirectives')
  .directive 'reUnitsGallery', ->
    restrict: 'AC'
    scope: {
      units: '='
      openUnit: '&'
    }
    template: '
      <div ng-repeat="unit in page_units" class = "units_gallery_inner" style="margin: 5px; float: left">
        <div re-unit unit="unit" on-unit-clicked = "open_unit"></div>
      </div>
    '

    link: (scope, element, attrs)->
      scope.$watch 'units',  ->
        angular.element(document).find('.units_gallery_inner').css('display', 'none')
        angular.element(document).find('.units_gallery_inner').css('display', 'block') if scope.units.length > 0
        scope.page_units = scope.units

       
       