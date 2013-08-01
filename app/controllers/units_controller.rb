class UnitsController < ActionController::Base
  def get_unit
     unit = Repo.new.unit params[:id]
     render json: unit    
  end
end