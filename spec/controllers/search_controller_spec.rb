describe SearchController do 
  
  it 'receives the correct params' do 
    get('geography', city: 'birg', state: 'nj', country: 'usa')
    query = assigns(:query)
    query[:city].should eq('birg')
    query[:state].should eq('nj')
    query[:country].should eq('usa')
  end 


end