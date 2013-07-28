(function() {
  describe('Units', function() {
    var u1, u2, u3,
      _this = this;
    this.units = {};
    u1 = [1, 3, '', 3, 2, ''];
    u2 = [2, 3, '', 1, 5, ''];
    u3 = [3, 3, '', 2, 1, ''];
    this.server = {
      areaUnits: function(id, callback) {
        return callback({
          units: [u1, u2, u3],
          meta: {
            address: 5,
            bathrooms: 4,
            bedrooms: 1,
            id: 0,
            imgDomain: "http://www.realtimerental.com/rrv10/rentalphotos/15/",
            imgUrl: 2,
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
      _this.units.pagination.numPerPage = 1;
      _this.units.filters.orderBy = 'price';
      expect(_this.units.filters.ranges.price.edges).toEqual([1, 3]);
      expect(_this.units.filters.ranges.bathrooms.edges).toEqual([1, 5]);
      return expect(_this.units.filters.ranges.bedrooms.edges).toEqual([3, 3]);
    });
    it('returns a filtered page of units', function() {
      _this.units.load(1);
      _this.units.filters.ranges.price.current = [0, 5];
      _this.units.pagination.numPerPage = 2;
      _this.units.applyFilters();
      expect(_this.units.filters.inRangeIndexes.length).toEqual(3);
      expect(_this.units.page(1).length).toEqual(2);
      return expect(_this.units.page(2).length).toEqual(1);
    });
    it('returns total numOfPages', function() {
      _this.units.load(1);
      expect(_this.units.pagination.numOfPages()).toEqual(1);
      _this.units.pagination.numPerPage = 2;
      expect(_this.units.pagination.numOfPages()).toEqual(2);
      _this.units.pagination.numPerPage = 1;
      return expect(_this.units.pagination.numOfPages()).toEqual(3);
    });
    return it('sorts an array', function() {
      var units;
      units = [[15001, 0, "15001.0.TH.jpg", 2, 5, "1 main"], [15024, 506887, "15024.0.TH.jpg", 6, 4, "1 main"], [15025, 598336, "15025.0.TH.jpg", 1, 1, "1 main"], [15028, 276040, "15028.0.TH.jpg", 7, 3, "1 main"], [15060, 667188, "15060.0.TH.jpg", 2, 6, "1 main"], [15084, 591504, "15084.0.TH.jpg", 7, 8, "1 main"]];
      return expect(_this.units.mergeSort(units, 1)[0]).toEqual([15001, 0, "15001.0.TH.jpg", 2, 5, "1 main"]);
    });
  });

}).call(this);
