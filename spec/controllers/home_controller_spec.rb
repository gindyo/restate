describe HomeController do 
  it 'renders index' do 
    get('index')
    response.should render_template 'index'
  end 
end