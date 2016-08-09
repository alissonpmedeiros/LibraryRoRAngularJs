Rails.application.routes.draw do
  
  scope '/api' do
    mount_devise_token_auth_for 'User', at: '/auth'
    resources :groups, except: [:new, :edit]
  end

  root "home#index"

  resources :books
  resources :authors
  resources :categories
  get '/search_authors', to: 'authors#searchAuthors'
  get '/search_books', to: 'books#searchBooks'
end
