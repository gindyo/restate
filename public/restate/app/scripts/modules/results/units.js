(function() {
  angular.module('Results').factory('units', function(server) {
    var units;
    units = function() {
      var all, allUnits, applyFilters, calculateNumOfPages, convertToUnit, currentPage, filters, getEdges, isInRange, load, mergeSort, meta, pagination, selectPage, sortUnits, splitArr, unitsInRange;
      all = [];
      meta = {};
      filters = {};
      pagination = {};
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
          var bathrooms_edges, bedrooms_edges, price_edges, u, _i, _len, _ref;
          _ref = data.units;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            u = _ref[_i];
            all.push(u);
          }
          meta = data.meta;
          price_edges = getEdges(data.units, 'price');
          bathrooms_edges = getEdges(data.units, 'bathrooms');
          bedrooms_edges = getEdges(data.units, 'bedrooms');
          filters.ranges.price.current = [price_edges[0], price_edges[1]];
          filters.ranges.price.edges = [price_edges[0], price_edges[1]];
          filters.ranges.bathrooms.current = [bathrooms_edges[0], bathrooms_edges[1]];
          filters.ranges.bathrooms.edges = [bathrooms_edges[0], bathrooms_edges[1]];
          filters.ranges.bedrooms.current = [bedrooms_edges[0], bedrooms_edges[1]];
          filters.ranges.bedrooms.edges = [bedrooms_edges[0], bedrooms_edges[1]];
          return applyFilters();
        });
      };
      allUnits = function() {
        var u, _i, _len;
        units = [];
        for (_i = 0, _len = all.length; _i < _len; _i++) {
          u = all[_i];
          units.push(convertToUnit(u));
        }
        return units;
      };
      calculateNumOfPages = function() {
        if (filters.inRangeIndexes.length > pagination.numPerPage) {
          return Math.ceil(filters.inRangeIndexes.length / pagination.numPerPage);
        } else {
          return 1;
        }
      };
      pagination = {
        totalUnits: function() {
          return all.length;
        },
        currentPage: 1,
        numPerPage: 8
      };
      pagination['numOfPages'] = calculateNumOfPages;
      filters['reverseIt'] = false;
      filters = {
        orderBy: 'price',
        orderDirection: function() {
          if (this.reverseIt) {
            return 'up';
          } else {
            return 'down';
          }
        },
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
        var i, u, _i, _len, _ref, _results;
        filters.inRangeIndexes = [];
        _ref = allUnits();
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          u = _ref[i];
          if (isInRange(u)) {
            _results.push(filters.inRangeIndexes.push(i));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      };
      getEdges = function(obj, field) {
        var el, max, min, _i, _len;
        min = obj[0][meta[field]];
        max = obj[1][meta[field]];
        for (_i = 0, _len = obj.length; _i < _len; _i++) {
          el = obj[_i];
          if (el[meta[field]] < min) {
            min = el[meta[field]];
          }
          if (el[meta[field]] > max) {
            max = el[meta[field]];
          }
        }
        return [min, max];
      };
      sortUnits = function() {
        var i, reversed, _i, _len;
        if (all.length > 0) {
          all = mergeSort(all, meta[filters.orderBy]);
          if (filters.reverseIt) {
            reversed = [];
            for (_i = 0, _len = all.length; _i < _len; _i++) {
              i = all[_i];
              reversed.push(all.pop());
            }
            return all = reversed;
          }
        }
      };
      unitsInRange = function() {
        var i, _i, _len, _ref;
        units = [];
        _ref = filters.inRangeIndexes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          i = _ref[_i];
          units.push(all[i]);
        }
        return units;
      };
      selectPage = function(pNum) {
        var allu, i, numPerPage, pageUnits, perPageUnits, _i, _ref, _ref1;
        pNum = pNum - 1;
        perPageUnits = parseInt(pagination.numPerPage) - 1;
        numPerPage = parseInt(pagination.numPerPage);
        pageUnits = [];
        allu = allUnits();
        for (i = _i = _ref = pNum * numPerPage, _ref1 = (pNum * numPerPage) + numPerPage - 1; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
          if (allu[filters.inRangeIndexes[i]]) {
            pageUnits.push(allu[filters.inRangeIndexes[i]]);
          }
        }
        return pageUnits;
      };
      currentPage = function() {
        return selectPage(parseInt(pagination.currentPage));
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
        unitsLoaded: function() {
          return all.length > 0;
        },
        all: allUnits(),
        pagination: pagination,
        resort: sortUnits,
        filters: filters,
        applyFilters: applyFilters,
        load: load,
        page: selectPage,
        currentPage: currentPage,
        mergeSort: mergeSort
      };
    };
    return units;
  });

}).call(this);
