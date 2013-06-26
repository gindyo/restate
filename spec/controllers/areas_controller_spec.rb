describe AreasController do 
  
  it 'gets all areas' do 
    Repo.any_instance.stub(:all_areas)
    Repo.any_instance.should_receive(:all_areas)
    get('all_areas')
    response.should be_success
  end 

  it "gets single area" do 
    Repo.any_instance.should_receive(:area_units).with('1').and_return([1])
    get('index', area_id: 1)
    assigns(:units).should_not be nil
    response.should be_success
  end
end