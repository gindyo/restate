describe SearchController do 
  
  it 'receives the correct params' do 
    get('geography', city: 'birg', state: 'nj', country: 'usa')
    query = assigns(:query)
    query[:city].should eq('birg')
    query[:state].should eq('nj')
    query[:country].should eq('usa')
  end 

  it "gets available places" do 
    get('all_places')
    response.should be_success
    assigns(:places).count.should eq 2
  end

end