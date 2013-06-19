class AreasController < ActionController::Base
  layout 'results'
  def repo
    return Repo.new
  end
  def all_areas
    areas = repo.all_areas
    render json: areas
  end
  def area_units
    @units = repo.area_units params[:area_id]
    
  end
  
end