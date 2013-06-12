class SearchController < ActionController::Base
  def geography
    @query = {}
    @query[:state] = params[:state] if params[:state]
    @query[:city] = params[:city] if params[:city]
    @query[:country] = params[:country] if params[:country]
    unit_factory = UnitFactory.new(RentalUnit)  
    unit_supplier = UnitSupplier.new unit_factory
    results = unit_supplier.get_json_units @query
    render json: results.as_json
  end
end