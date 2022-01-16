Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
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
