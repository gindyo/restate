describe Repo do
  before :each do 
    @repo = Repo.new

  end 

  it 'returns areas' do 
    areas = @repo.all_areas
    areas.count.should be > 0
  end
  it 'returs place by id' do 
    @repo.should respond_to(:area_units).with(1)
  end
end