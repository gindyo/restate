angular.module('HomePage').controller 'MainCtrl', ($scope, server)->
  $scope.all_areas = []
  server.all_areas (data)->
    $scope.all_areas = data
    