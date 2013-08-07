@angular.module('FloorPlan')
  .directive 'floor', ->
    restrict: 'ACE'
    scope: {
      bedrooms: '@'
      bathroms: '@'
      kitchen: '@'
      livingroom: '@'
    }
    compile: (element, attrs, link)->
      floor = document.createElement 'div'
      floor.setAttribute 'style', '
        border: 1px solid;
        width: 400px;
        text-align: center

      '
      bedrooms = []
      bathrooms = []



      createBedroom = (num)->
        bedroom = document.createElement 'div'
        $(bedroom).css {
          width: '100%'
          height: '100px'
          border: '1px solid' 
        }
        
        bedroom.setAttribute 'class', 're-bedroom'
        bedroom.innerHTML = 'BD'+ num
        bedroom

      createLivingroom = (num)->
        lr = document.createElement 'div'
        $(lr).css {
          width: '60%'
          height: '150px'
          background: '#e9e9e9'
          border: '1px solid'
          'border-right': '0px' 
          float: 'left'
          # 'border-top': '0px'
          # 'text-align': 'center'
          #display: 'table-cell'
        }
        lr.innerHTML = 'LR'
        lr

      createKitchen = (num)->
        kitchen = document.createElement 'div'
        $(kitchen).css {
          width: '20%'
          height: '100px'
          border: '1px solid'
          'border-left': '0px' 
          'margin-top': '50px'
          float: 'right'
          # 'border-top': '0px'
          # 'text-align': 'center'
          #display: 'table-cell'
        }
        kitchen.innerHTML = 'K'
        kitchen

      createBathroom = (num)->
        placement = '50px'
        if num % 2 == 0
          placement = '0px'
        
        bathroom = document.createElement 'div'
        text = document.createElement 'div'
        text.setAttribute 'style', '
          heigt: 
        '
        $(bathroom).css {
          'font-size': '20px'
          'width': '50%'
          'height': '50px'
          'border': '1px solid'
          'background': 'red'
          'clear': 'both'
          'margin-left': placement
          'top': '50%' 
        }
        bathroom.innerHTML = 'BA'
        bathroom

      for b in [0..attrs.bedrooms-1]
        bedrooms.push createBedroom(b)
      for b in [0..attrs.bathrooms-1]
        bathrooms.push createBathroom(b)

      bedroomsLeft = document.createElement 'div'
      bedroomsRight = document.createElement 'div'

      assembleBedrooms = ->
        for bd, i in bedrooms
          if bedrooms.length > 0
            if i%2 == 0
              angular.element(bedroomsLeft).append bedrooms.shift()
            else
              angular.element(bedroomsRight).append bedrooms.shift()
          if bathrooms.length > 0
            if i%2 == 0
              angular.element(bedroomsLeft).append bathrooms.shift()
            else
              angular.element(bedroomsRight).append bathrooms.shift()

      bedroomsLeft.setAttribute 'style', '
        width: 40%;
        float: left;
      '

      bedroomsRight.setAttribute 'style', '
        width: 40%;
        float: right;
      '
      clearBoth = document.createElement('div')
      clearBoth.setAttribute "style", 'clear: both'
      assembleBedrooms()
      angular.element(floor).append bedroomsLeft
      angular.element(floor).append bedroomsRight
      
      angular.element(floor).append clearBoth
      angular.element(floor).append createLivingroom if attrs.livingroom > 0
      angular.element(floor).append createKitchen if attrs.kitchen > 0
      angular.element(floor).append clearBoth
      element.append floor

      link = (scope, element, attrs)->
        $('.re-bedroom').resizable()
  
  
  