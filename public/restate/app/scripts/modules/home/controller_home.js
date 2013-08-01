(function() {
  angular.module('HomePage', ['Server']);

  angular.module('HomePage').controller('HomeCtrl', function($scope, server) {
    $scope.all_areas = [];
    return server.allAreas(function(data) {
      return $scope.allAreas = data;
    });
  });

}).call(this);
