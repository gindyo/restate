describe UnitSupplier do 
  before :each do
    Repo.stub(:where).and_return([{id:2},{id:3}])
    @unit_factory =UnitFactory.new(Unit)
    @unit_factory.stub(:create).and_return(Unit.new)
    @unit_supplier = UnitSupplier.new  @unit_factory
  end

  it 'gets json units' do 
    query = {city: 'brig', state: 'nj', country: 'usa'}
    @unit_factory.should_receive(:create).exactly(2).times
    Repo.should_receive(:where).with(query)
    @unit_supplier.get_json_units(query).should_not  be nil
  end
end