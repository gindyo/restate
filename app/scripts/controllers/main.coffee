'use strict';

angular.module('realEstateApp')
  .controller 'MainCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ]
  .controller 'NotFoundCtrl', ->
    return

