class AreasController < ActionController::Base
  layout 'results'
  def repo
    return Repo.new
  end
  def all_areas
    areas = repo.all_areas
    render json: areas
  end
  def index
    @area_id = params[:area_id]
    @units = repo.area_units @area_id

  end
  def area_units
    area_units = Repo.new.area_units params[:area_id]
    render json:  area_units
  end
  
end