describe "unit routes", :type=> :routing do 
  it 'routes to units\:id' do
    get("units/1").should route_to('units#get_unit', id: "1")
  end
end
