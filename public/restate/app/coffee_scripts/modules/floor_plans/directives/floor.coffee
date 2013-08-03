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
        width: 200px;

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
        bedroom = document.createElement 'div'
        $(bedroom).css {
          width: '80%'
          height: '100px'
          border: '1px solid'
          'border-right': '0px' 
          'border-top': '0px'
          'vertical-align': 'middle'
          'text-align': 'center'
          display: 'table-cell'
        }
        
        bedroom.setAttribute 'class', 're-bedroom'
        bedroom.innerHTML = 'LR'
        bedroom

      createBathroom = (num)->
        placement = '40px'
        door = 'left'
        if num % 2 == 0
          placement = '0px'
          door = 'right' 
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
          'text-align': door
          'margin-left': placement
          'top': '50%' 
        }
        angular.element(bathroom).addClass 're-bathroom'
        $(bathroom).resizable()
        bathroom.innerHTML = '\\'
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
      angular.element(floor).append createLivingroom
      element.append floor
      link = (scope, element, attrs)->
        $('.re-bedroom').resizable()
  
  
  