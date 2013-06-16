angular.module('homePage').controller 'main', ($scope)->
  server = {}
  server.get_places = -> 
    [
      {city: 'Ventnor, NJ', url: 'Place/Ventnor'}
      {city: 'brigantine, CA', url: '/Place/Brigantine'}
      {city: 'margate CA', url: 'Place/Ventnor'}
      {city: 'atlantic city', url: '/Place/Brigantine'}
      {city: 'ocean city', url: 'Place/Ventnor'}
      {city: 'absecon', url: '/Place/Brigantine'}
    ]
    

  $scope.places =  server.get_places()
    