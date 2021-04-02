Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #
  namespace :api do
    namespace :v1 do
      resources :airlines, param: :slug do
        member do
          resources :reviews
        end
      end
      resources :reviews
    end
  end

end
