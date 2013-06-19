class Repo
   def get_units search_params
   end

   def all_areas
    data =  [
      {city: 'Ventnor, NJ', url: 'areas/1/units'},
      {city: 'brigantine, CA', url: '/areas/2/units'},
      {city: 'margate CA', url: 'areas/3/units'},
      {city: 'atlantic city', url: '/areas/4/units'},
      {city: 'ocean city', url: 'areas/5/units'},
      {city: 'absecon', url: '/areas/6/units'}
    ]
     
   end
   def area_units id
     [
        {unit_id: 1, price: 1000, img_url: nil, bedrooms: 2}

     ]
   end
end
