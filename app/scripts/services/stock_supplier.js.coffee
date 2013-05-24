angular.module('Services').service 'StockSupplier', ->

  YQLQuery = (query, callback) ->
    @query = query
    @callback = callback or ->

    @fetch = ->
      throw new Error("YQLQuery.fetch(): Parameters may be undefined")  if not @query or not @callback
      scriptEl = document.createElement("script")
      uid = "yql" + +new Date()
      encodedQuery = encodeURIComponent(@query.toLowerCase())
      instance = this
      YQLQuery[uid] = (json) ->
        instance.callback json
        delete YQLQuery[uid]

        document.body.removeChild scriptEl

      scriptEl.src = "http://query.yahooapis.com/v1/public/yql?q=" + encodedQuery + "&format=json&callback=YQLQuery." + uid
      document.body.appendChild scriptEl
  
get_stock = (symbol)->
  q = 'select * from yahoo.finance.quotes where symbol in ('+symbol+')&format=json&diagnostics=true&env=http%3A%2F%2Fdatatables.org%2Falltables.env'
  
  
{
  find: (id)-> properties[id]
  get_stock: (symbol)-> get_stock(symbol)
}