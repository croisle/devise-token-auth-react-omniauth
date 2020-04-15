Rails.application.config.middleware.use OmniAuth::Builder do
    provider :facebook,      ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_APP_SECRET']
    provider :stripe_connect, ENV['STRIPE_CONNECT_ID'], ENV['STRIPE_SECRET_KEY']
end