(function() {
  var home_page;

  home_page = angular.module('home_page', []);

  home_page.directive('search_box', function() {
    return {
      restrict: 'E',
      template: 'This is a test\
    <div>\
      <input type= "text" placeholder= "Search...">\
    <div>\
\
\
\
  '
    };
  });

}).call(this);
