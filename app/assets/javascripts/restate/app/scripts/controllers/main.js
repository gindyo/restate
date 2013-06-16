(function() {
  angular.module('homePage').controller('main', function($scope) {
    var server;
    server = {};
    server.get_places = function() {
      return [
        {
          city: 'Ventnor, NJ',
          url: 'Place/Ventnor'
        }, {
          city: 'brigantine, CA',
          url: '/Place/Brigantine'
        }, {
          city: 'margate CA',
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
