describe SearchController do 
  
  it 'receives the correct params' do 
    get('geography', city: 'birg', state: 'nj', country: 'usa')
    query = assigns(:query)
    query[:city].should eq('birg')
    query[:state].should eq('nj')
    query[:country].should eq('usa')
  end 

  it "gets available places" do 
    Repo.any_instance.should_receive(:all_places)
    get('all_places')
    response.should be_success
  end

  it "gets a place by id" do 
    layout 'application'
    Repo.any_instance.should_receive(:get_place)
    get('get_place', id:'124')
    response.should be_success
    response.should render_template 'results/place'
  end
end