describe 'Units', ->
  @units = {}
  # id, bedrooms, img, price, bathrooms, address 
  u1 = [1, 3, '', 3, 2, '']
  u2 = [2, 3, '', 1, 5, '']
  u3 = [3, 3, '', 2, 1, '']
  @server = {
    area_units: (id, callback)-> 
      callback({
        units:[u1,u2,u3]
        meta:  {
          address: 5
          bathrooms: 4
          bedrooms: 1
          id: 0
          img_domain: "http://www.realtimerental.com/rrv10/rentalphotos/15/"
          img_url: 2
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
    @units.pagination.num_per_page = 1
    @units.filters.order_by = 'price'
    expect(@units.filters.ranges.price.edges).toEqual [1,3]
    expect(@units.filters.ranges.bathrooms.edges).toEqual [1,5]
    expect(@units.filters.ranges.bedrooms.edges).toEqual [3,3]

  it 'returns a filtered page of units', =>
    @units.load(1)
    @units.filters.ranges.price.current = [1,3]
    @units.pagination.num_per_page = 2
    @units.apply_filters()
    expect(@units.filters.in_range_indexes.length).toEqual 3
    expect(@units.page(1).length).toEqual 2
    expect(@units.page(2).length).toEqual 1
    #expect(@units.page(2)).toEqual([u3])
  



    # expect(@units.sorted_by('price', false)).not.toEqual([u1,u2,u3])
    # expect(@units.sorted_by('bathrooms', false)).toEqual([u3,u1,u2])
    # expect(@units.sorted_by('bathrooms', false)).not.toEqual([u1,u2,u3])
    # expect(@units.sorted_by('bathrooms', true)).toEqual([u2,u1,u3])