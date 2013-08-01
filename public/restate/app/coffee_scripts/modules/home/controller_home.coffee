angular.module('HomePage', ['Server'])
angular.module('HomePage').controller 'HomeCtrl', ($scope, server)->
  $scope.all_areas = []
  server.allAreas (data)->
    $scope.allAreas = data
    