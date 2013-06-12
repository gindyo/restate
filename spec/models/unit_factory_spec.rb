 
describe UnitFactory do 
  before :each do 
   @unit_class = double('UnitClass')
   @unit_class.stub :create
   @unit_factory = UnitFactory.new(@unit_class)
  end
  it 'responds to "create"' do 
    @unit_factory.should respond_to :create
  end

  it 'creates units' do 
    @unit_class.should_receive(:create).with({id: 1})
    unit = @unit_factory.create({id: 1})
    
  end
end