(function() {
  this.angular.module('RestateDirectives').directive('rePager', function($compile) {
    return {
      restrict: 'AC',
      replace: true,
      scope: {
        numberOfPages: '=',
        currentPage: '='
      },
      link: function(scope, element, attrs) {
        var pages;
        pages = [];
        scope.goTo = function(page) {
          console.log(page);
          scope.currentPage = page;
          return angular.element(pages[page]).css('background', '#000000');
        };
        scope.$watch('numberOfPages', function() {
          var allPages, i, _i, _ref;
          if (scope.numberOfPages > 1) {
            allPages = document.createElement('div');
            for (i = _i = 1, _ref = scope.numberOfPages; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
              pages[i] = document.createElement('div');
              angular.element(pages[i]).attr('ng-click', "goTo(" + i + ")");
              angular.element(pages[i]).css({
                width: '10px',
                height: '10px',
                border: '1px solid',
                float: 'left',
                'margin-left': '2px',
                'border-radius': '10px'
              });
              angular.element(allPages).append(pages[i]);
            }
            return element.append($compile(allPages)(scope));
          }
        });
        return scope.$watch('currentPage', function() {
          var i, _i, _ref;
          if (scope.numberOfPages > 1) {
            for (i = _i = 1, _ref = scope.numberOfPages; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
              angular.element(pages[i]).css('background', '#ffffff');
            }
            return angular.element(pages[scope.currentPage]).css('background', '#000000');
          }
        });
      }
    };
  });

}).call(this);
