# frozen_string_literal: true

class Api::V1::Users::OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env['omniauth.auth'])
    if @user.persisted?
      sign_in @user
      # Normal case with no headers
      redirect_to '/dashboard'

      # manually trying to render a json
      # headers = @user.create_new_auth_token
      # response = Hash.new 
      # response["user"] = @user 
      # response["headers"] = headers
      # render json: {response: response, status: :ok  }
    else
      session['devise.facebook_data'] = request.env['omniauth.auth']
      redirect_to new_user_registration_url
    end
  end
  
  def google_oauth2
    # You need to implement the method below in your model (e.g. app/models/user.rb)
    @user = User.from_omniauth(request.env['omniauth.auth'])

    if @user.persisted?
      # flash[:notice] = I18n.t 'devise.omniauth_callbacks.success', kind: 'Google'
      # sign_in_and_redirect @user, event: :authentication
      sign_in @user

      redirect_to '/dashboard'

    else
      session['devise.google_data'] = request.env['omniauth.auth'].except(:extra) # Removing extra as it can overflow some session stores
      redirect_to new_user_registration_url, alert: @user.errors.full_messages.join("\n")
    end
end

  def failure
    flash[:notice] = 'failure'
    redirect_to root_path
  end

  # def omniauth_success
  #   # byebug
  #   get_resource_from_auth_hash
  #   set_token_on_resource
  #   create_auth_params

  #   if resource_class.devise_modules.include?(:confirmable)
  #     # don't send confirmation email!!!
  #     @resource.skip_confirmation!
  #   end

  #   # ================================================
  #   # Update here to Model Class
  #   # from :
  #        sign_in(:user, @resource, store: false, bypass: false)
  #   # to: 
  #   # sign_in(:traveler, @resource, store: false, bypass: false)

  #   @resource.save!

  #   yield @resource if block_given?

  #   render_data_or_redirect('deliverCredentials', @auth_params.as_json, @resource.as_json)

  # end

#   protected


#   def set_omniauth_params
#     byebug
#     return if omniauth_params_present?
#     omniauth_params = {
#       'resource_class' => 'User',
#       'omniauth_window_type' => 'newWindow'
#     }
#     request.env['omniauth.params'] = omniauth_params
#   end

#   def get_resource_from_auth_hash
#     # find or create user by provider and provider uid
# byebug
#     # ================================================
#     # Update here to Model Class
#     # from :
#     #    @resource = resource_class.where(
#     # to: 
#     @resource = User.where({
#       uid:      auth_hash['uid'],
#       provider: auth_hash['provider']
#     }).first_or_initialize

#     if @resource.new_record?
#       handle_new_resource
#     end

#     # sync user info with provider, update/generate auth token
#     assign_provider_attrs(@resource, auth_hash)

#     # assign any additional (whitelisted) attributes
#     if assign_whitelisted_params?
#       extra_params = whitelisted_params
#       @resource.assign_attributes(extra_params) if extra_params
#     end

#     @resource
#   end

end
