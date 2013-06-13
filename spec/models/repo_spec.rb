describe Repo do
  before :each do 
    @repo = Repo.new

  end 

  it 'returns places' do 
    places = @repo.all_places
    places.should eq ['brigantine', 'ventnor']
  end

end