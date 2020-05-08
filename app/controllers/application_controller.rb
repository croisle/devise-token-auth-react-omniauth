class ApplicationController < ActionController::Base

        include DeviseTokenAuth::Concerns::SetUserByToken

        before_action :configure_permitted_parameters, :if => :devise_controller?

        protect_from_forgery unless: -> { request.format.json? }

        rescue_from ActiveRecord::RecordNotFound, with: :render_404

        def render_404
                render :json => { :errors => "Invalid ID" , message: "Can't find this URL"}, :status => :not_found
                # render json: { error: "Invalid ID", is_success: false}, status: 404
        end

        private

        def configure_permitted_parameters
                added_attrs = [:fullname, :image, :nickname, :strpe_connect]
                devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
                devise_parameter_sanitizer.permit :account_update, keys: added_attrs
                # devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :nickname])
        end
end
