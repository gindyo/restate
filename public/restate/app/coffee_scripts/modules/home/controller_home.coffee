angular.module('HomePage', ['Server'])
angular.module('HomePage').controller 'HomeCtrl', ($scope, server)->
  $scope.all_areas = []
  server.all_areas (data)->
    $scope.all_areas = data
    