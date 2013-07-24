(function() {
  angular.module('RestateDirectives').directive('searchBox', function() {
    return {
      restrict: 'EA',
      scope: {
        items: '=',
        width: '@',
        searchFields: "@"
      },
      template: '\
      <style>\
        .search_box_links a:hover{\
          background-color: #efefef;\
        }\
        .search_box_links a{\
          color: #696969\
        }\
        .search_box_links a{\
          text-align: left;\
          display: block;\
          width: 100%;\
          \
        }\
        .search_box_links_containter {\
          left: 5px;\
          padding-bottom: 10px;\
          background-color: white;\
          position: absolute;\
          overflow: hidden\
         \
        }\
        .search_box_link {\
          padding-left: 5px\
        }\
      </style>\
      <div style= "position: relative">\
        <input type= "text" placeholder= "Search" ng-model = "search" style="width: {{width}}; margin-bottom: 0px; padding-left: 5px; padding-right: 5px">\
        <div ng-show="show_suggestions" class="search_box_links_containter">\
          <div style="width: {{width}}" class ="search_box_links" ng-repeat = "item in items  | filter:search_filt" > \
            \
            <a class="search_box_link" href="#/{{item.url}}"> {{item.city}}</a> \
          </div>\
        </div>\
      <div>\
    ',
      link: function(scope, element, attr) {
        if (!attr.width) {
          attr.width = '200px';
        }
        scope.show_suggestions = false;
        return scope.search_filt = function(item) {
          var field, regex, _i, _len, _ref;
          if (scope.search && scope.search.length > 2) {
            regex = new RegExp(scope.search, 'i');
            _ref = attr.searchFields.split(',');
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              field = _ref[_i];
              if (item[field].match(regex) !== null) {
                scope.show_suggestions = true;
                return true;
              }
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
