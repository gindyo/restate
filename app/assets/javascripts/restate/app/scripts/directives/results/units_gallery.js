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
        units: '='
      },
      template: '\
      <select ng-model="order_by">\
        <option value = "price" > Sort By</option>\
        <option value="price"> Price </option>\
        <option value="address"> Address </option>\
        <option value="bedrooms"> Bedrooms </option>\
        <option value="bathrooms"> Bathrooms </option>\
      </select>\
      reverse <input type="checkbox" ng-model = "reverse_it">\
      <br>      \
      <select ng-model="per_page">\
        <option value = "10" > Results to show</option>\
        <option value=10> 10 </option>\
        <option value=20> 20 </option>\
        <option value=30> 30 </option>\
      </select>\
      <br>\
      <a style="cursor: pointer" ng-click = "page_back()"><</a> showing page {{page + 1}} of {{pages}} <a style="cursor: pointer" ng-click = "page_forward()">></a>\
      <br>\
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
        scope.order_by = 'price';
        scope.price = 'price';
        scope.page = 0;
        scope.reverse_it = false;
        scope.per_page = 10;
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
      },
      controller: function($scope, $filter) {
        var orderFilter, set_page_units;
        orderFilter = $filter('orderBy');
        $scope.$watch('[order_by, reverse_it] | json', function() {
          $scope.units = orderFilter($scope.units, $scope.order_by, $scope.reverse_it);
          return set_page_units();
        });
        $scope.page_back = function() {
          if (($scope.page - 1) < 0) {
            return $scope.page = $scope.pages - 1;
          } else {
            return $scope.page -= 1;
          }
        };
        $scope.page_forward = function() {
          if (($scope.page + 1) === $scope.pages) {
            return $scope.page = 0;
          } else {
            return $scope.page += 1;
          }
        };
        set_page_units = function() {
          $scope.pages = Math.round(($scope.units.length / $scope.per_page) + 0.5);
          return $scope.page_units = $scope.units.slice($scope.page * $scope.per_page, +(($scope.page * $scope.per_page) + $scope.per_page - 1) + 1 || 9e9);
        };
        $scope.$watch('units', function() {
          return set_page_units();
        });
        $scope.$watch('page', function() {
          return set_page_units();
        });
        return $scope.$watch('per_page', function() {
          return set_page_units();
        });
      }
    };
  });

}).call(this);
