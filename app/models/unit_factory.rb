class UnitFactory
  def initialize(unit_class) 
    @unit = unit_class
  end
  def create params 
    @unit.create params
  end
end