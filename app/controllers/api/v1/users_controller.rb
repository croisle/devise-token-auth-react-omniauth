
class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!
  # before_action :authenticate_user!
  before_action :set_current_user


  def get_current_user
  
    render json: {user: @user, status: :ok}

  end

    private

      # Use callbacks to share common setup or constraints between actions.
  def set_current_user
    @user = current_api_v1_user
  end

     # Only allow a trusted parameter "white list" through.
     def user_params
      params.require(:user).permit(:email, :password, :description, :image, :nickname, :phone_number)
    end
end
# @houses = House.includes(:house_type).active.with_attached_images