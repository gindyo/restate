(function() {
  angular.module('homePage').controller('main', function($scope) {
    var server;
    server = {};
    server.get_places = function() {
      return [
        {
          city: 'ventnor',
          url: 'Place/Ventnor'
        }, {
          city: 'brigantine',
          url: '/Place/Brigantine'
        }, {
          city: 'margate',
          url: 'Place/Ventnor'
        }, {
          city: 'atlantic city',
          url: '/Place/Brigantine'
        }, {
          city: 'ocean city',
          url: 'Place/Ventnor'
        }, {
          city: 'absecon',
          url: '/Place/Brigantine'
        }
      ];
    };
    return $scope.places = server.get_places();
  });

}).call(this);
