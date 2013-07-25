(function() {
  angular.module('Results').service('Units', function(server, $filter) {
    var all, apply_filters, filters, get_edges, is_in_range, load, order_by_filter, pagination, select_page, sorted_units, units_in_range;
    all = [];
    order_by_filter = $filter('orderBy');
    pagination = {
      currentPage: 1,
      num_per_page: 8
    };
    filters = {
      order_by: 'price',
      reverse_it: false,
      in_range_indexes: [],
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
    is_in_range = function(el) {
      return el.price >= filters.ranges.price.current[0] && el.price <= filters.ranges.price.current[1] && el.bathrooms >= filters.ranges.bathrooms.current[0] && el.bathrooms <= filters.ranges.bathrooms.current[1] && el.bedrooms >= filters.ranges.bedrooms.current[0] && el.bedrooms <= filters.ranges.bedrooms.current[1];
    };
    apply_filters = function() {
      if (!Array.prototype.filter) {
        $(all).filter(function(i) {
          if (is_in_range(this)) {
            return filters.in_range_indexes.push(i);
          }
        });
      } else {
        all.filter(function(el, i) {
          if (is_in_range(el)) {
            return filters.in_range_indexes.push(i);
          }
        });
      }
      return console.log(filters.in_range_indexes);
    };
    get_edges = function(obj, field) {
      var edges, ordered;
      edges = [];
      ordered = order_by_filter(obj, field);
      edges[0] = ordered[0][field];
      edges[1] = ordered[ordered.length - 1][field];
      return edges;
    };
    load = function(id) {
      return server.area_units(id, function(data) {
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
          all.push(unit);
        }
        filters.ranges.price.current = filters.ranges.price.edges = get_edges(all, 'price');
        filters.ranges.bathrooms.current = filters.ranges.bathrooms.edges = get_edges(all, 'bathrooms');
        return filters.ranges.bedrooms.current = filters.ranges.bedrooms.edges = get_edges(all, 'bedrooms');
      });
    };
    sorted_units = function() {
      return order_by_filter(this.all, filters.order_by, filters.reverse_it);
    };
    units_in_range = function() {
      var i, units, _i, _len, _ref;
      units = [];
      _ref = filters.in_range_indexes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        units.push(all[i]);
      }
      return units;
    };
    select_page = function(pNum) {
      var i, ordered_units, page_units, per_page_units, _i, _ref, _ref1;
      pNum = pNum - 1;
      per_page_units = parseInt(pagination.num_per_page) - 1;
      if (!pagination.currentPage) {
        pNum = 0;
      }
      ordered_units = order_by_filter(units_in_range(), filters.order_by, filters.reverse_it);
      page_units = [];
      for (i = _i = _ref = pNum * pagination.num_per_page, _ref1 = pagination.num_per_page - 1; _i <= _ref1; i = _i += 1) {
        page_units.push(all[filters.in_range_indexes[i]]);
      }
      console.log(page_units);
      return page_units;
    };
    return {
      pagination: pagination,
      filters: filters,
      apply_filters: apply_filters,
      all: all,
      load: load,
      page: select_page
    };
  });

}).call(this);
