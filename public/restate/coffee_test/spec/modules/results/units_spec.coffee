describe 'Units', ->
  @units = {}
  # id, bedrooms, img, price, bathrooms, address 
  u1 = [1, 3, '', 3, 2, '']
  u2 = [2, 3, '', 1, 5, '']
  u3 = [3, 3, '', 2, 1, '']
  @server = {
    areaUnits: (id, callback)-> 
      callback({
        units:[u1,u2,u3]
        meta:  {
          address: 5
          bathrooms: 4
          bedrooms: 1
          id: 0
          imgDomain: "http://www.realtimerental.com/rrv10/rentalphotos/15/"
          imgUrl: 2
          price: 3
        }
      })
    }
 
  beforeEach module 'Results'
  
  beforeEach module ($provide)=>
    $provide.value 'server', @server
    return

  beforeEach(inject((Units)=>
    @units = Units
    return
  ))

  it 'loads units and sets up all needed values', =>
    @units.load(1)
    @units.pagination.numPerPage = 1
    @units.filters.orderBy = 'price'
    expect(@units.filters.ranges.price.edges).toEqual [1,3]
    expect(@units.filters.ranges.bathrooms.edges).toEqual [1,5]
    expect(@units.filters.ranges.bedrooms.edges).toEqual [3,3]

  it 'returns a filtered page of units', =>
    @units.load(1)
    @units.filters.ranges.price.current = [0,5]
    @units.pagination.numPerPage = 2
    @units.applyFilters()
    expect(@units.filters.inRangeIndexes.length).toEqual 3
    expect(@units.page(1).length).toEqual 2
    expect(@units.page(2).length).toEqual 1

  it 'returns total numOfPages', =>
    @units.load(1)
    expect(@units.pagination.numOfPages()).toEqual 1
    @units.pagination.numPerPage = 2
    expect(@units.pagination.numOfPages()).toEqual 2
    @units.pagination.numPerPage = 1
    expect(@units.pagination.numOfPages()).toEqual 3

  it 'returns current page', =>
    @units.load(1)
    @units.applyFilters()
    @units.pagination.numPerPage = 2
    @units.pagination.currentPage = 1
    expect(@units.currentPage().length).toEqual 2 

 