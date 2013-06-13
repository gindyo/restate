(function() {
  angular.module('hp', []).directive('searchBox', function() {
    return {
      restrict: 'AE',
      scope: '@',
      template: '\
      <div>\
        <input type= "text" placeholder= "Search...">\
        <div> {{myVar}}</div>\
      <div>\
    ',
      link: function(scope) {
        return scope.myVar = 'dimital';
      }
    };
  }).controller('main', function($scope) {
    return $scope.myVar = 'milena';
  });

}).call(this);
