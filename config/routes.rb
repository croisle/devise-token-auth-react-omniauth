Rails.application.routes.draw do
  namespace :api, defautls: {format: :json} do
    namespace  :v1 do
       mount_devise_token_auth_for 'User', at: 'auth',
       controllers: { omniauth_callbacks: 'users/omniauth_callbacks'}
   end
 end

 root 'pages#home'
 get '*all', to: 'pages#home', constraints: lambda { |req|
   req.path.exclude? 'rails/active_storage'
 }

end
