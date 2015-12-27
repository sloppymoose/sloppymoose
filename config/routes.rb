Rails.application.routes.draw do
  use_doorkeeper
  devise_for :users

  root 'welcome#index'

  authenticate :user do
    resources :check_ins, only: %i{index}
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

  authenticate :user, lambda {|u| u.try(:admin) } do
    namespace :admin do
      resources :users
    end
  end
end
