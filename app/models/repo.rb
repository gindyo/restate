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
        {unit_id: 1, price: 1000, img_url: 'http://www.prufoxroach.com/mlsphotos/thumbs_320x240/127/1/77/2944178.jpg', bedrooms: 2, bathrooms: 1, address: '1 main'},
        {unit_id: 1, price: 500, img_url: 'http://www.prufoxroach.com/mlsphotos/thumbs_320x240/127/1/59/187759.jpg', bedrooms: 3, bathrooms: 1, address: '2 main'},
        {unit_id: 1, price: 900, img_url: 'http://www.prufoxroach.com/mlsphotos/thumbs_320x240/129/2/95/1183928.jpg', bedrooms: 4, bathrooms: 2, address: '3 main'},
        {unit_id: 1, price: 4000, img_url: 'http://www.prufoxroach.com/mlsphotos/thumbs_320x240/127/1/22/2959969.jpg', bedrooms: 2, bathrooms: 3, address: '4 main'}
     ]
     units = []
     for p in (0..36) do
       units.push ({unit_id: p, price: (p), img_url: 'http://www.prufoxroach.com/mlsphotos/thumbs_320x240/127/1/77/2944178.jpg', bedrooms: 2, bathrooms: 1, address: '1 main'})
          
     end
     units
   end
end
