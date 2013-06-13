Restate::Application.routes.draw do
  root :to => 'home#index'
  #Search routes
  match '/search' => 'search#index'
  match '/geography/:city/:state/:country' => 'search#geography'
  match '/geography/:city/:state' => 'search#geography'
  match '/geography/:city' => 'search#geography'
  match '/all_places' => 'search#all_places'
  #Unit routes
  match '/units/:id' => 'units#get_unit'
end
