require 'sidekiq/web'

Rails.application.routes.draw do
  use_doorkeeper
  devise_for :users

  root 'welcome#index'

  authenticate :user do
    resources :check_ins, only: %i{index}
    resource :linked_legacy_account, only: %i{create}
    get :linked_legacy_account, to: 'linked_legacy_accounts#create'
    namespace :api do
      resources :active_events, only: %i{index}
      resources :check_ins, only: %i{index create}
    end
  end

  unauthenticated do
    as :user do
      namespace :api do
        post 'users', to: 'registrations#create', as: :user_registration
      end
    end
  end

  namespace :api do
    resources :shirt_sizes, only: %i{index}
  end

  authenticate :user, lambda {|u| u.try(:admin) } do
    namespace :admin do
      mount Sidekiq::Web => '/sidekiq'
      resources :users
    end
  end
end
