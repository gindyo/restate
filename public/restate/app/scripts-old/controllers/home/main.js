(function() {
  angular.module('HomePage').controller('MainCtrl', function($scope, server) {
    $scope.all_areas = [];
    return server.all_areas(function(data) {
      return $scope.all_areas = data;
    });
  });

}).call(this);
