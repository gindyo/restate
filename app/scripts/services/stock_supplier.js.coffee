window.stock_results_wachers = []
window.stock_quote_callback = (data)->
  window.stock_quote_result = data
  for watcher in  window.stock_results_wachers
    watcher.received_new_stock()
    
angular.module('Services').service 'StockSupplier', ($http, $q)->
  get_stock = (symbol, callback)->
    q = 'select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22'+symbol+'%22)&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=window.stock_quote_callback'
    url = 'http://query.yahooapis.com/v1/public/yql?q='+q 
    $http.jsonp(url).then (data)->
      alert 'hi'
      callback(data)
  {
    find: (id)-> properties[id]
    get_stock: (symbol, callback)-> get_stock(symbol, callback)
  }
