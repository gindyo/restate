(function() {
  this.angular.module('FloorPlan').directive('floor', function() {
    return {
      restrict: 'ACE',
      scope: {
        bedrooms: '@',
        bathroms: '@',
        kitchen: '@',
        livingroom: '@'
      },
      compile: function(element, attrs, link) {
        var assembleBedrooms, b, bathrooms, bedrooms, bedroomsLeft, bedroomsRight, clearBoth, createBathroom, createBedroom, createKitchen, createLivingroom, floor, _i, _j, _ref, _ref1;
        floor = document.createElement('div');
        floor.setAttribute('style', '\
        border: 1px solid;\
        width: 400px;\
        text-align: center\
\
      ');
        bedrooms = [];
        bathrooms = [];
        createBedroom = function(num) {
          var bedroom;
          bedroom = document.createElement('div');
          $(bedroom).css({
            width: '100%',
            height: '100px',
            border: '1px solid'
          });
          bedroom.setAttribute('class', 're-bedroom');
          bedroom.innerHTML = 'BD' + num;
          return bedroom;
        };
        createLivingroom = function(num) {
          var lr;
          lr = document.createElement('div');
          $(lr).css({
            width: '60%',
            height: '150px',
            background: '#e9e9e9',
            border: '1px solid',
            'border-right': '0px',
            float: 'left'
          });
          lr.innerHTML = 'LR';
          return lr;
        };
        createKitchen = function(num) {
          var kitchen;
          kitchen = document.createElement('div');
          $(kitchen).css({
            width: '20%',
            height: '100px',
            border: '1px solid',
            'border-left': '0px',
            'margin-top': '50px',
            float: 'right'
          });
          kitchen.innerHTML = 'K';
          return kitchen;
        };
        createBathroom = function(num) {
          var bathroom, placement, text;
          placement = '50px';
          if (num % 2 === 0) {
            placement = '0px';
          }
          bathroom = document.createElement('div');
          text = document.createElement('div');
          text.setAttribute('style', '\
          heigt: \
        ');
          $(bathroom).css({
            'font-size': '20px',
            'width': '50%',
            'height': '50px',
            'border': '1px solid',
            'background': 'red',
            'clear': 'both',
            'margin-left': placement,
            'top': '50%'
          });
          bathroom.innerHTML = 'BA';
          return bathroom;
        };
        for (b = _i = 0, _ref = attrs.bedrooms - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; b = 0 <= _ref ? ++_i : --_i) {
          bedrooms.push(createBedroom(b));
        }
        for (b = _j = 0, _ref1 = attrs.bathrooms - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; b = 0 <= _ref1 ? ++_j : --_j) {
          bathrooms.push(createBathroom(b));
        }
        bedroomsLeft = document.createElement('div');
        bedroomsRight = document.createElement('div');
        assembleBedrooms = function() {
          var bd, i, _k, _len, _results;
          _results = [];
          for (i = _k = 0, _len = bedrooms.length; _k < _len; i = ++_k) {
            bd = bedrooms[i];
            if (bedrooms.length > 0) {
              if (i % 2 === 0) {
                angular.element(bedroomsLeft).append(bedrooms.shift());
              } else {
                angular.element(bedroomsRight).append(bedrooms.shift());
              }
            }
            if (bathrooms.length > 0) {
              if (i % 2 === 0) {
                _results.push(angular.element(bedroomsLeft).append(bathrooms.shift()));
              } else {
                _results.push(angular.element(bedroomsRight).append(bathrooms.shift()));
              }
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
        bedroomsLeft.setAttribute('style', '\
        width: 40%;\
        float: left;\
      ');
        bedroomsRight.setAttribute('style', '\
        width: 40%;\
        float: right;\
      ');
        clearBoth = document.createElement('div');
        clearBoth.setAttribute("style", 'clear: both');
        assembleBedrooms();
        angular.element(floor).append(bedroomsLeft);
        angular.element(floor).append(bedroomsRight);
        angular.element(floor).append(clearBoth);
        if (attrs.livingroom > 0) {
          angular.element(floor).append(createLivingroom);
        }
        if (attrs.kitchen > 0) {
          angular.element(floor).append(createKitchen);
        }
        angular.element(floor).append(clearBoth);
        element.append(floor);
        return link = function(scope, element, attrs) {
          return $('.re-bedroom').resizable();
        };
      }
    };
  });

}).call(this);
