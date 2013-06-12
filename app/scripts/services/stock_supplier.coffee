  
angular.module('Services').service 'StockSupplier', ($http,$location)->
  get_stock = (symbol, callback)->
    q = 'select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+symbol+'%22)&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=JSON_CALLBACK'
    url = 'http://query.yahooapis.com/v1/public/yql?q='+q 
    $http.jsonp(url).then (response)->
      callback(response.data)
  {
    get_stock: (symbol, callback)-> get_stock(symbol, callback)
  }
