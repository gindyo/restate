class SearchController < ActionController::Base
  def repo
    Repo.new
  end
  def geography
    @query = {}
    @query[:state] = params[:state] if params[:state]
    @query[:city] = params[:city] if params[:city]
    @query[:country] = params[:country] if params[:country]
    results = repo.get_units @query
    render json: results.as_json
  end
  def all_places
    @places = repo.all_places 
    render json: @places
  end

  def get_place
    repo.get_place params[:id]
    render 'results/place'
  end

end