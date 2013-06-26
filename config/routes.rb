Restate::Application.routes.draw do
  root :to => 'home#index'
  #Search routes
  match '/search' => 'search#index'
  match '/geography/:city/:state/:country' => 'search#geography'
  match '/geography/:city/:state' => 'search#geography'
  match '/geography/:city' => 'search#geography'
   #Unit routes
  match '/units/:id' => 'units#get_unit'
  #areas
  match '/areas/all'=> 'areas#all_areas'
  match '/areas/:area_id'=> 'areas#index'
  match '/areas/:area_id/units'=> 'areas#area_units'

end
