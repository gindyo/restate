angular.module('hp',[])
  .directive 'searchBox', ->
    restrict: 'AE'
    scope: '@'
    template: '
      <div>
        <input type= "text" placeholder= "Search...">
        <div> {{myVar}}</div>
      <div>
    '
    link: (scope)->
      scope.myVar = 'dimital'
  
  .controller 'main', ($scope)-> 
    $scope.myVar = 'milena'