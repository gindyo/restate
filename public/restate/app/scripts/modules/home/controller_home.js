(function() {
  angular.module('HomePage').controller('HomeCtrl', function($scope, server) {
    $scope.all_areas = [];
    return server.all_areas(function(data) {
      return $scope.all_areas = data;
    });
  });

}).call(this);
