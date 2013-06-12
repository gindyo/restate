class Unit
  attr_accessor :id, :price
  def self.create params
    unit = Unit.new
    unit.id = params[:id]
    unit.price = params[:price]
    unit
  end
end