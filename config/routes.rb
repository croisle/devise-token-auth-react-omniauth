# frozen_string_literal: true

Rails.application.routes.draw do

  devise_scope :user do
    match '/api/v1/auth/facebook', to: 'api/v1/users/omniauth_callbacks#facebook', via: [:get, :post]
    match '/omniauth/facebook/callback' => 'api/v1/users/omniauth_callbacks#facebook', :via => [:get, :post]
    match '/omniauth/google_oauth2/callback' => 'api/v1/users/omniauth_callbacks#google_oauth2', :via => [:get, :post]
  end

  namespace :api, defautls: { format: :json } do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth',
                                          controllers: { omniauth_callbacks: 'api/v1/users/omniauth_callbacks' }

        get '/infos' => 'users#get_current_user'
    end
  end

  root 'pages#home'
  get '*all', to: 'pages#home', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
