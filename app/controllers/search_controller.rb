class SearchController < ActionController::Base
  def geography
    @query = {}
    @query[:state] = params[:state] if params[:state]
    @query[:city] = params[:city] if params[:city]
    @query[:country] = params[:country] if params[:country]
    repo = Repo.new 
    results = repo.get_units @query
    render json: results.as_json
  end
  def all_places
    @repo = Repo.new
    @places = @repo.all_places 
    render json: @places
  end
end