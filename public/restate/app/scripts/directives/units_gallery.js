(function() {
  this.angular.module('RestateDirectives').directive('reUnitsGallery', function() {
    return {
      restrict: 'AC',
      scope: {
        units: '=',
        openUnit: '&'
      },
      template: '\
    <div style="width: 950px; float: left">\
      <div ng-repeat="unit in page_units" class = "units_gallery_inner" style="margin: 5px; float: left" >\
        <div re-unit unit="unit" on-unit-clicked = "open_unit" unit-width ="unit.width"></div>\
      </div>\
    </div>\
    ',
      link: function(scope, element, attrs) {
        return scope.$watch('units', function() {
          return scope.page_units = scope.units;
        });
      }
    };
  });

}).call(this);
