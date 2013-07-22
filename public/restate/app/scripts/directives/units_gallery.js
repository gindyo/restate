(function() {
  this.angular.module('RestateDirectives').directive('reUnitsGallery', function() {
    return {
      restrict: 'AC',
      scope: {
        units: '=',
        openUnit: '&'
      },
      template: '\
      <div ng-repeat="unit in page_units" class = "units_gallery_inner" style="margin: 5px; float: left">\
        <div re-unit unit="unit" on-unit-clicked = "open_unit"></div>\
      </div>\
    ',
      link: function(scope, element, attrs) {
        return scope.$watch('units', function() {
          angular.element(document).find('.units_gallery_inner').css('display', 'none');
          if (scope.units.length > 0) {
            angular.element(document).find('.units_gallery_inner').css('display', 'block');
          }
          return scope.page_units = scope.units;
        });
      }
    };
  });

}).call(this);
