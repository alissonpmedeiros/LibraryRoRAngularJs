Rails.application.routes.draw do

  scope '/api' do
    mount_devise_token_auth_for 'User', at: '/auth'
    resources :groups, except: [:new, :edit]
  end

  root "home#index"

  resources :books
  resources :users
  resources :categories
  get '/search_authors', to: 'users#searchAuthors'
  get '/search_books', to: 'books#searchBooks'
end
