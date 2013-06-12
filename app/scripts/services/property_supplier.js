(function() {
  angular.module('Services').service('PropertySupplier', function() {
    var properties;

    properties = [
      {
        address: '123 Main, Ocean City',
        price: '$500',
        contact: '609 344-3556',
        img: 'http://info.rentnet.com/property/70/31170/photo/31170.p74.jpg'
      }, {
        address: '323 Broadway, Ocean City',
        price: '$700',
        contact: '609 344-3556',
        img: 'http://info.rentnet.com/property/30/1630/photo/1630.p161.jpg'
      }
    ];
    return {
      find: function(id) {
        var query;

        query = {
          property_found: false
        };
        if (properties[id]) {
          query.property = properties[id];
          query.property_found = true;
        }
        return query;
      }
    };
  });

}).call(this);
