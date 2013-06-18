describe Repo do
  before :each do 
    @repo = Repo.new

  end 

  it 'returns places' do 
    places = @repo.all_places
    places.should eq ['brigantine', 'ventnor']
  end
  it 'returs place by id' do 
    @repo.should respond_to(:get_place).with(1)
  end
end