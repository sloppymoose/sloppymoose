Rails.application.routes.draw do
  devise_for :users

  root 'welcome#index'

  resources :check_ins, only: %i{index new create}

  namespace :admin do
    resources :users
  end

end
