(function() {
  angular.module('Results').controller('ResultsCtrl', function($scope, server, $filter) {
    var is_in_range, limit_to_filter, order_by_filter, sorted_fields;
    $scope.show_filters = false;
    $scope.units_in_range_indexes = [];
    $scope.area_units = [];
    $scope.page_units = [];
    $scope.reverse_it = false;
    $scope.num_units = 8;
    $scope.order_by = 'price';
    $scope.order_direction = 'up';
    limit_to_filter = $filter('limitTo');
    order_by_filter = $filter('orderBy');
    sorted_fields = ['price', 'bathrooms', 'bedrooms'];
    $scope.price_floor = 0;
    $scope.price_ceiling = 0;
    $scope.bathroom_floor = 0;
    $scope.bathroom_ceiling = 0;
    $scope.open_loading_modal = true;
    $scope.units_in_range = function() {
      var i, units, _i, _len, _ref;
      units = [];
      _ref = $scope.units_in_range_indexes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        units.push($scope.area_units[i]);
      }
      return units;
    };
    $scope.$watch('area_id', function() {
      return server.area_units($scope.area_id, function(data) {
        var i, u, unit, units, _i, _len, _ref;
        units = [];
        _ref = data.units;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          u = _ref[i];
          unit = {};
          unit.id = u[data.meta.id];
          unit.price = u[data.meta.price];
          unit.img_url = data.meta.img_domain + u[data.meta.img_url];
          unit.bedrooms = u[data.meta.bedrooms];
          unit.bathrooms = u[data.meta.bathrooms];
          unit.address = u[data.meta.address];
          units.push(unit);
        }
        $scope.area_units = units;
        $scope.units_loaded = true;
        return $scope.open_loading_modal = false;
      });
    });
    $scope.$watch('area_units', function() {
      var bathrooms_sorted, bedrooms_sorted, field, i, price_sorted, _i, _j, _len, _ref;
      $scope.numPages = Math.ceil($scope.units_in_range().length / $scope.num_units);
      price_sorted = order_by_filter($scope.area_units, 'price');
      bathrooms_sorted = order_by_filter($scope.area_units, 'bathrooms');
      bedrooms_sorted = order_by_filter($scope.area_units, 'bedrooms');
      for (i = _i = 0, _ref = $scope.area_units.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        $scope.units_in_range_indexes.push(i);
      }
      for (_j = 0, _len = sorted_fields.length; _j < _len; _j++) {
        field = sorted_fields[_j];
        if (eval(field + '_sorted.length') > 0) {
          $scope['min_' + field] = eval(field + '_sorted[0].' + field);
          $scope['max_' + field] = eval(field + '_sorted[' + field + '_sorted.length-1].' + field);
          $scope[field + '_floor'] = $scope['min_' + field];
          $scope[field + '_ceiling'] = $scope['max_' + field];
        }
      }
      $scope.page_units = $scope.units_in_range().slice(0, +($scope.num_units - 1) + 1 || 9e9);
      return price_sorted = bathrooms_sorted = bedrooms_sorted = null;
    });
    is_in_range = function(el) {
      return el.price >= $scope.min_price && el.price <= $scope.max_price && el.bathrooms >= $scope.min_bathrooms && el.bathrooms <= $scope.max_bathrooms && el.bedrooms >= $scope.min_bedrooms && el.bedrooms <= $scope.max_bedrooms;
    };
    $scope.$watch('max_price + min_price + min_bathrooms + max_bathrooms + max_bedrooms + min_bedrooms', function() {
      $scope.units_in_range_indexes = [];
      if (!Array.prototype.filter) {
        return $($scope.area_units).filter(function(i) {
          if (is_in_range(this)) {
            return $scope.units_in_range_indexes.push(i);
          }
        });
      } else {
        return $scope.area_units.filter(function(el, i) {
          if (is_in_range(el)) {
            return $scope.units_in_range_indexes.push(i);
          }
        });
      }
    });
    $scope.$watch('num_units', function() {
      $scope.page_units = $scope.units_in_range().slice(0, +($scope.num_units - 1) + 1 || 9e9);
      return $scope.numPages = Math.ceil($scope.units_in_range().length / $scope.num_units);
    });
    $scope.reverse_order = function() {
      $scope.reverse_it = !$scope.reverse_it;
      if ($scope.reverse_it) {
        $scope.order_direction = 'down';
      } else {
        $scope.order_direction = 'up';
      }
      return $scope.numPages = Math.ceil($scope.units_in_range().length / $scope.num_units);
    };
    $scope.$watch('[order_by, reverse_it, units_in_range_indexes] | json', function() {
      var ordered_units;
      ordered_units = order_by_filter($scope.units_in_range(), $scope.order_by, $scope.reverse_it);
      $scope.page_units = limit_to_filter(ordered_units, $scope.num_units);
      return $scope.numPages = Math.ceil($scope.units_in_range().length / $scope.num_units);
    });
    $scope.currentPage = 1;
    $scope.numPages = 30;
    $scope.maxSize = 5;
    $scope.$watch('currentPage', function() {
      return $scope.selectPage(parseInt($scope.currentPage));
    });
    $scope.selectPage = function(pNum) {
      var end_of_page, ordered_units, page_units, per_page_units, start_of_page;
      pNum = pNum - 1;
      per_page_units = parseInt($scope.num_units) - 1;
      if (!$scope.currentPage) {
        pNum = 0;
      }
      ordered_units = order_by_filter($scope.units_in_range(), $scope.order_by, $scope.reverse_it);
      start_of_page = pNum * per_page_units;
      end_of_page = start_of_page + per_page_units;
      page_units = ordered_units.slice(start_of_page, +end_of_page + 1 || 9e9);
      return $scope.page_units = page_units;
    };
    $scope.formatRange = function(value) {
      return '$' + value;
    };
    return $scope.open_unit = function(id) {
      return console.log("clicked " + id);
    };
  });

}).call(this);
