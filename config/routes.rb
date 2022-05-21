Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  post '/auth/login', to: 'authentication#login'
  post '/auth/signup', to: 'authentication#signup'
  get '/auth/verify_jwt', to: 'authentication#verify_jwt'

  namespace :api do
    namespace :v1 do
      resources :users
      resources :spots
      resources :outings
      # namespace :outings do
        post 'outings/toggle_favorite', action: :toggle_favorite, controller: 'outings'
      # end

      resources :outing_reviews
      resources :couples
    end
  end
end
