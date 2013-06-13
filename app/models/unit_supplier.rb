class UnitSupplier 
  def initialize  factory
    @repo = Repo
    @unit_factory = factory
  end
  def get_json_units search_params
    raise 'no search parameters' unless search_params
    results = @repo.where search_params
    units = []
    results.each do |unit|
      units.push (@unit_factory.create unit)
    end
    units
  end

 
end
