describe Repo do
  before :each do 
    @repo = Repo.new

  end 

  it 'returns places' do 
    places = @repo.all_areas
    places.count.should be > 0
  end
  it 'returs place by id' do 
    @repo.should respond_to(:area_units).with(1)
  end
end