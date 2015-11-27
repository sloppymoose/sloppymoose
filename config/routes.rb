Rails.application.routes.draw do
  devise_for :users

  root 'welcome#index'

  authenticate :user do
    resources :check_ins, only: %i{index new create}
  end

  authenticate :user, lambda {|u| u.try(:admin) } do
    namespace :admin do
      resources :users
    end
  end
end
