describe AreasController do 
  
  it 'gets all units within area id' do 
    Repo.any_instance.should_receive :area_units
    get('area_units', area_id: 1)
  end 

  
end