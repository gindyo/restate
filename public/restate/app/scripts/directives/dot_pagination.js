(function() {
  this.angular.module('RestateDirectives').directive('rePager', function() {
    return {
      restrict: 'AC',
      scope: {
        numberOfPages: '=',
        currentPage: '='
      },
      compile: function(element, attrs, link) {
        var i, pages, _i, _ref,
          _this = this;
        pages = [];
        for (i = _i = 0, _ref = attrs.numberOfPages; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
          pages[i] = document.createElement('div');
          angular.element(pages[i]).on('click', function() {
            return _this.changePage(i);
          });
          angular.element(page[i]).css({
            width: '10px',
            height: '10px',
            'border-radius': '10px'
          });
        }
        return link = function(scope, element, attrs) {
          return this.changePage = function(page) {
            scope.currentPage = page;
            return angular.element(pages[page]).css('background', '#e9e9e9');
          };
        };
      }
    };
  });

}).call(this);
