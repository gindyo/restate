(function() {
  describe('Units', function() {
    var u1, u2, u3,
      _this = this;
    this.units = {};
    u1 = [1, 3, '', 3, 2, ''];
    u2 = [2, 3, '', 1, 5, ''];
    u3 = [3, 3, '', 2, 1, ''];
    this.server = {
      area_units: function(id, callback) {
        return callback({
          units: [u1, u2, u3],
          meta: {
            address: 5,
            bathrooms: 4,
            bedrooms: 1,
            id: 0,
            img_domain: "http://www.realtimerental.com/rrv10/rentalphotos/15/",
            img_url: 2,
            price: 3
          }
        });
      }
    };
    beforeEach(module('Results'));
    beforeEach(module(function($provide) {
      $provide.value('server', _this.server);
    }));
    beforeEach(inject(function(Units) {
      _this.units = Units;
    }));
    it('loads units and sets up all needed values', function() {
      _this.units.load(1);
      _this.units.pagination.num_per_page = 1;
      _this.units.filters.order_by = 'price';
      expect(_this.units.filters.ranges.price.edges).toEqual([1, 3]);
      expect(_this.units.filters.ranges.bathrooms.edges).toEqual([1, 5]);
      return expect(_this.units.filters.ranges.bedrooms.edges).toEqual([3, 3]);
    });
    return it('returns a filtered page of units', function() {
      _this.units.load(1);
      _this.units.filters.ranges.price.current = [1, 3];
      _this.units.pagination.num_per_page = 2;
      _this.units.apply_filters();
      expect(_this.units.filters.in_range_indexes.length).toEqual(3);
      expect(_this.units.page(1).length).toEqual(2);
      return expect(_this.units.page(2).length).toEqual(1);
    });
  });

}).call(this);
