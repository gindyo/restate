@angular.module('Results')
  .directive 'unit', ->
    restrict: 'AC'
    scope: {
      unit: '='
      onUnitClicked: '&'
    }
    template: '
      <div class = "rental_unit_style pie" >
          <h5 class="heading_style  heading_1_style pull-right">{{unit.bedrooms}}bd/{{unit.bathrooms}}ba</h4>
          <h4 class ="heading_style heading_1_style pull-center">${{unit.price}}</h3>
          <img ng-src="{{unit.img_url}}" class="pull-center image_style" ng-click ="onUnitClicked(unit.id)">
          <p>{{unit.address}}</p>
        </div>
    '
    link: (scope, element, attrs)->
      $('.rental_unit_style').attr('style', '
        background: rgba(255, 255, 255, 0.984314);
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #a8a4a4;
        font-family: "helvetica";
        width: 165px;
        height: 265px;
        behavior: url(/assets/PIE.htc);
      '     
      )
      $('.heading_style').attr('style','
          color: #605959
          text-align: left
        ')
      $('.heading_1_style').attr('style', '
          text-align: right;
          width: 80px;
          vertical-align: top
        ')
      $('.heading_2_style').attr('style','
          width: 148px;
        ')
      $('.image_style').attr('style', '
          width: 100%;
          cursor: pointer;
        ')

      $('.p_style').attr('style', '
          margin-top: 15px;

        ')
    

