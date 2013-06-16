#the search_box element accepts the following attributes: 
# items {string} - the name of the array with items 
#NOTE  item is an object in the format {name: 'nameOfItem', url: 'url'}
angular.module('homePage')
  .directive 'searchBox', ->
    restrict: 'EA'
    scope: {
      items: '='
      width: '@'
      searchField: "@"

    }
    template: '
      <style>
        .search_box_links a:hover{
          background-color: #efefef;
        }
        .search_box_links a{
          color: #696969
        }
        .search_box_links a{
          display: block;
          width: 100%;
          
        }
        .search_box_links_containter {
          background-color: white;
          position: absolute;
          overflow: hidden
         
        }
        .search_box_link {
          padding-left: 5px
        }
      </style>
      <div>
        <input type= "text" placeholder= "Search" ng-model = "search" style="width: {{width}}; margin-bottom: 0px; padding-left: 0px; padding-right: 0px">
        <div ng-show="show_suggestions" class="search_box_links_containter">
          <div style="width: {{width}}" class ="search_box_links" ng-repeat = "item in items  | filter:search_filt" > 
            <a class="search_box_link" href="{{item.url}}"> {{item.city}}</a> 
          </div>
        </div>
      <div>
    '
    link: (scope, element, attr)-> 
      attr.width = '200px' if !attr.width
      scope.show_suggestions = false
      scope.search_filt = (item)->
        if scope.search && scope.search.length > 0
            regex = new RegExp(scope.search, 'i')
            if item['city'].match(regex) != null
              scope.show_suggestions = true
              return true
        else 
          scope.show_suggestions = false
          return false
    controller: ($scope)->
      $scope.width = '500px'
      
  
 