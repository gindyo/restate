(function() {
  this.angular.module('Results').filter('startFrom', function() {
    return function(input, start) {
      start += 1;
      return input.slice(start);
    };
  });

  this.angular.module('Results').directive('unitsGallery', function() {
    return {
      restrict: 'AE',
      scope: {
        units: '=',
        per_page: '@'
      },
      template: '\
      <div ng-repeat="unit in page_units" style="margin: 10px; float: left">\
        <div style="{{rental_unit_style}}" >\
          <h4 style="{{heading_style + heading_1_style}}" class="pull-right">{{unit.bedrooms}}bd/{{unit.bathrooms}}ba</h4>\
          <h2 style="{{heading_style + heading_1_style}}" class="pull-center">${{unit.price}}</h2>\
          <img ng-src="{{unit.img_url}}" class="pull-center" style = "{{image_style}}">\
          <p>{{unit.address}}</p>\
        </div>\
      </div>\
    ',
      link: function(scope, element, attrs) {
        scope.$watch('units', function() {
          return scope.page_units = scope.units;
        });
        scope.rental_unit_style = '\
        background: rgba(255, 255, 255, 0.984314);\
        padding: 5px;\
        border-radius: 10px;\
        border: 1px solid #a8a4a4;\
        font-family: "helvetica";\
        width: 197px;\
        height: 277px\
      ';
        scope.heading_style = '\
        color: #605959\
      ';
        scope.heading_1_style = '\
        text-align: right;\
        width: 80px\
      ';
        scope.heading_2_style = '\
        width: 148px\
      ';
        scope.image_style = '\
        width: 100%\
      ';
        return scope.p_style = '\
        margin-top: 15px\
      ';
      }
    };
  });

}).call(this);
