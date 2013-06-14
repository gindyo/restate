(function() {
  angular.module('homePage').directive('searchBox', function() {
    return {
      restrict: 'E',
      scope: {
        items: '=',
        width: '@'
      },
      template: '\
      <style>\
        .search_box_links a:hover{\
          background-color: white\
        }\
        .search_box_links a{\
          display: block;\
          width: 100%;\
          \
        }\
        .search_box_links_containter {\
          border: solid 1px;\
          width: {{width}}\
          \
        }\
      </style>\
      <div>\
        <input type= "text" placeholder= "Search" ng-model = "search" style="width: {{width}}; margin-bottom: 0px; padding-left: 0px; padding-right: 0px">\
        <div ng-show="show_suggestions" class="search_box_links_containter" style ="margin-top: 0px; border: solid 1px; border-top: none; width: {{width}}">\
          <div class ="search_box_links" style="width: {{width}}" ng-repeat = "item in items  | filter:search_filt" ><a href="{{item.url}}"> {{item.city}}</a> </div>\
        </div>\
      <div>\
    ',
      link: function(scope, element, attr) {
        if (!attr.width) {
          attr.width = '200px';
        }
        scope.show_suggestions = false;
        return scope.search_filt = function(item) {
          var regex;
          if (scope.search && scope.search.length > 0) {
            regex = new RegExp(scope.search);
            if (item.city.match(regex) !== null) {
              scope.show_suggestions = true;
              return true;
            }
          } else {
            scope.show_suggestions = false;
            return false;
          }
        };
      },
      controller: function($scope) {
        return $scope.width = '500px';
      }
    };
  });

}).call(this);
