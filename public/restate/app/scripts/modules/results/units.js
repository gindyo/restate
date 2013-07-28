(function() {
  angular.module('Results').service('Units', function(server, $filter) {
    var all, applyFilters, calculateNumOfPages, convertToUnit, currentPage, filters, getEdges, isInRange, load, mergeSort, meta, orderByFilter, pagination, selectPage, sortedUnits, splitArr, unitsInRange;
    all = [];
    meta = [];
    orderByFilter = $filter('orderBy');
    pagination = {};
    calculateNumOfPages = function() {
      if (all.length > pagination.numPerPage) {
        return Math.ceil(all.length / pagination.numPerPage);
      } else {
        return 1;
      }
    };
    pagination = {
      currentPage: 1,
      numPerPage: 8
    };
    pagination['numOfPages'] = calculateNumOfPages;
    filters = {
      orderBy: 'price',
      reverseIt: false,
      inRangeIndexes: [],
      ranges: {
        price: {
          edges: [],
          current: []
        },
        bathrooms: {
          edges: [],
          current: []
        },
        bedrooms: {
          edges: [],
          current: []
        }
      }
    };
    isInRange = function(el) {
      return el['price'] >= filters.ranges.price.current[0] && el['price'] <= filters.ranges.price.current[1] && el['bathrooms'] >= filters.ranges.bathrooms.current[0] && el['bathrooms'] <= filters.ranges.bathrooms.current[1] && el['bedrooms'] >= filters.ranges.bedrooms.current[0] && el['bedrooms'] <= filters.ranges.bedrooms.current[1];
    };
    applyFilters = function() {
      filters.inRangeIndexes = [];
      if (!Array.prototype.filter) {
        return $(all).filter(function(i) {
          if (isInRange(this)) {
            return filters.inRangeIndexes.push(i);
          }
        });
      } else {
        return all.filter(function(el, i) {
          if (isInRange(el)) {
            return filters.inRangeIndexes.push(i);
          }
        });
      }
    };
    getEdges = function(obj, field) {
      var max, min;
      min = obj[0][meta[field]];
      max = obj[1][meta[field]];
      obj.filter(function(el) {
        if (el[meta[field]] < min) {
          min = el[meta[field]];
        }
        if (el[meta[field]] > max) {
          return max = el[meta[field]];
        }
      });
      return [min, max];
    };
    convertToUnit = function(u) {
      var unit;
      unit = {};
      unit.id = u[meta.id];
      unit.price = u[meta.price];
      unit.imgUrl = meta.img_domain + u[meta.img_url];
      unit.bedrooms = u[meta.bedrooms];
      unit.bathrooms = u[meta.bathrooms];
      unit.address = u[meta.address];
      return unit;
    };
    load = function(id) {
      return server.areaUnits(id, function(data) {
        var bathrooms_edges, bedrooms_edges, i, price_edges, u, unit, _i, _len, _ref;
        _ref = data.units;
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          u = _ref[i];
          unit = {};
          unit.id = u[data.meta.id];
          unit.price = u[data.meta.price];
          unit.imgUrl = data.meta.img_domain + u[data.meta.img_url];
          unit.bedrooms = u[data.meta.bedrooms];
          unit.bathrooms = u[data.meta.bathrooms];
          unit.address = u[data.meta.address];
          all.push(unit);
        }
        console.time('timer');
        mergeSort(all, 1);
        console.timeEnd('timer');
        meta = data.meta;
        price_edges = getEdges(data.units, 'price');
        bathrooms_edges = getEdges(data.units, 'bathrooms');
        bedrooms_edges = getEdges(data.units, 'bedrooms');
        filters.ranges.price.current = [price_edges[0], price_edges[1]];
        filters.ranges.price.edges = [price_edges[0], price_edges[1]];
        filters.ranges.bathrooms.current = [bathrooms_edges[0], bathrooms_edges[1]];
        filters.ranges.bathrooms.edges = [bathrooms_edges[0], bathrooms_edges[1]];
        filters.ranges.bedrooms.current = [bedrooms_edges[0], bedrooms_edges[1]];
        return filters.ranges.bedrooms.edges = [bedrooms_edges[0], bedrooms_edges[1]];
      });
    };
    sortedUnits = function() {
      return all = orderByFilter(all, filters.orderBy, filters.reverseIt);
    };
    unitsInRange = function() {
      var i, units, _i, _len, _ref;
      units = [];
      _ref = filters.inRangeIndexes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        units.push(all[i]);
      }
      return units;
    };
    selectPage = function(pNum) {
      var i, orderedUnits, pageUnits, perPageUnits, _i, _ref, _ref1;
      pNum = pNum - 1;
      perPageUnits = parseInt(pagination.numPerPage) - 1;
      orderedUnits = orderByFilter(unitsInRange(), filters.orderBy, filters.reverseIt);
      pageUnits = [];
      for (i = _i = _ref = pNum * pagination.numPerPage, _ref1 = (pNum * pagination.numPerPage) + pagination.numPerPage - 1; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        if (all[filters.inRangeIndexes[i]]) {
          pageUnits.push(all[filters.inRangeIndexes[i]]);
        }
      }
      return pageUnits;
    };
    currentPage = function() {
      return selectPage(pagination.currentPage);
    };
    splitArr = function(a) {
      var a1, midpoint;
      midpoint = Math.floor(a.length / 2);
      a1 = a.splice(midpoint);
      return [a1, a];
    };
    mergeSort = function(arr, pos) {
      var left, m1, m2, right, sorted, spl;
      sorted = [];
      if (arr.length === 1) {
        return arr;
      } else {
        spl = splitArr(arr);
        left = spl[0];
        right = spl[1];
        m1 = mergeSort(left, pos);
        m2 = mergeSort(right, pos);
        while (m1.length > 0 && m2.length > 0) {
          if (m1[0][pos] < m2[0][pos]) {
            sorted.push(m1.shift());
          } else {
            sorted.push(m2.shift());
          }
        }
        if (m1.length === 0) {
          while (m2.length > 0) {
            sorted.push(m2.shift());
          }
          return sorted;
        }
        if (m2.length === 0) {
          while (m1.length > 0) {
            sorted.push(m1.shift());
          }
          return sorted;
        }
      }
    };
    return {
      all: all,
      pagination: pagination,
      reSort: sortedUnits(),
      filters: filters,
      applyFilters: applyFilters,
      load: load,
      page: selectPage,
      currentPage: currentPage,
      mergeSort: mergeSort
    };
  });

}).call(this);
