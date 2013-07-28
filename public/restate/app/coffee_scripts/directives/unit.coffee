@angular.module('RestateDirectives')
  .directive 'reUnit', ->
    restrict: 'AC'
    scope: {
      unit: '='
      onUnitClicked: '&'
      unitWidth: '='
    }
    compile: (element, attrs)->
      rentalUnit = document.createElement('div')
      h5 = document.createElement('h5')
      h5.innerHTML = '{{unit.bedrooms}}bd/{{unit.bathrooms}}ba'
      h4 = document.createElement('h4')
      h4.innerHTML = '${{unit.price}}'
      img = document.createElement('img')
      img.setAttribute('ng-src', '{{unit.imgUrl}}')
      p = document.createElement('p')
      p.innerHTML = '{{unit.address}}'

      angular.element(rentalUnit).append(h5)
      angular.element(rentalUnit).append(h4)
      angular.element(rentalUnit).append(img)
      angular.element(rentalUnit).append(p)
      element.append(rentalUnit)
      element.addClass('round')


      angular.element(rentalUnit).attr('style', '
        background: #FEFEFA;
        padding: 10px;
        border-radius: 10px;
        border: 1px solid #a8a4a4;
        font-family: "helvetica";
        height: 250px;
        width: 200px
        '     
      )


      
      angular.element(h5).attr('style','
          color: #605959;
          text-align: left;
          float: right;
        ')
      angular.element(h4).attr('style', '
          text-align: right;
          width: 80px;
          vertical-align: top
        ')
      angular.element(img).attr('style','
          width: 100%;
          cursor: pointer;
        ')

      angular.element(document).find('.p_style').attr('style', '
          margin-top: 15px;

        ')
    

