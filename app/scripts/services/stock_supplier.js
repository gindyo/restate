(function() {
  angular.module('Services').service('StockSupplier', function($http, $location) {
    var get_stock;

    get_stock = function(symbol, callback) {
      var q, url;

      q = 'select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + symbol + '%22)&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=JSON_CALLBACK';
      url = 'http://query.yahooapis.com/v1/public/yql?q=' + q;
      return $http.jsonp(url).then(function(response) {
        return callback(response.data);
      });
    };
    return {
      get_stock: function(symbol, callback) {
        return get_stock(symbol, callback);
      }
    };
  });

}).call(this);
