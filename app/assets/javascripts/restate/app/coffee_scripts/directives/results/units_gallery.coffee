@angular.module('Results').filter 'startFrom', ->
  return (input, start)->
    start += 1
    input.slice start

@angular.module('Results')
  .directive 'unitsGallery', ->
    restrict: 'AE'
    scope: {
      units: '='
    }
    template: '
      <select ng-model="order_by">
        <option value = "price" > Sort By</option>
        <option value="price"> Price </option>
        <option value="address"> Address </option>
        <option value="bedrooms"> Bedrooms </option>
        <option value="bathrooms"> Bathrooms </option>
      </select>
      reverse <input type="checkbox" ng-model = "reverse_it">
      <br>      
      <select ng-model="per_page">
        <option value = "10" > Results to show</option>
        <option value=10> 10 </option>
        <option value=20> 20 </option>
        <option value=30> 30 </option>
      </select>
      <br>
      <a style="cursor: pointer" ng-click = "page_back()"><</a> showing page {{page + 1}} of {{pages}} <a style="cursor: pointer" ng-click = "page_forward()">></a>
      <br>
      <div ng-repeat="unit in page_units" style="margin: 10px; float: left">
        <div style="{{rental_unit_style}}" >
          <h4 style="{{heading_style + heading_1_style}}" class="pull-right">{{unit.bedrooms}}bd/{{unit.bathrooms}}ba</h4>
          <h2 style="{{heading_style + heading_1_style}}" class="pull-center">${{unit.price}}</h2>
          <img ng-src="{{unit.img_url}}" class="pull-center" style = "{{image_style}}">
          <p>{{unit.address}}</p>
        </div>
      </div>
    '

    link: (scope, element, attrs)->
      scope.order_by = 'price'
      scope.price = 'price'
      scope.page = 0
      scope.reverse_it = false
      scope.per_page = 10
     

      scope.rental_unit_style = '
        background: rgba(255, 255, 255, 0.984314);
        padding: 5px;
        border-radius: 10px;
        border: 1px solid #a8a4a4;
        font-family: "helvetica";
        width: 197px;
        height: 277px
      '     
      scope.heading_style = '
        color: #605959
      '
      scope.heading_1_style = '
        text-align: right;
        width: 80px
      '
      scope.heading_2_style = '
        width: 148px
      '
      scope.image_style = '
        width: 100%
      '
      scope.p_style = '
        margin-top: 15px
      '
    controller: ($scope, $filter)->
      orderFilter = $filter('orderBy')
      $scope.$watch '[order_by, reverse_it] | json', ->
        $scope.units = orderFilter($scope.units, $scope.order_by, $scope.reverse_it )
        set_page_units()
      
     
      $scope.page_back = ->
        if ($scope.page - 1) < 0
          $scope.page = $scope.pages - 1
        else
          $scope.page -=1
       

       $scope.page_forward = ->
        if ($scope.page + 1) == $scope.pages 
          $scope.page = 0
        else
          $scope.page +=1
        
      
      set_page_units = ->
        $scope.pages = Math.round ($scope.units.length / $scope.per_page) + 0.5
        $scope.page_units = $scope.units[($scope.page*$scope.per_page)..(($scope.page*$scope.per_page) + $scope.per_page - 1) ]
       

      $scope.$watch 'units',  ->
        set_page_units()
      
      $scope.$watch 'page',  ->
        set_page_units()

      $scope.$watch 'per_page',  ->
        set_page_units()
