#routes_spec.rb
describe "area routes", :type=> :routing do 
  it 'routes to single area units' do 
    get("/areas/123/").should route_to("areas#index", area_id:'123')
  end

  it 'routes to all areas' do 
    get("/areas/all").should route_to("areas#all_areas")
  end
  
end



