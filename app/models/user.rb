# frozen_string_literal: true

class User < ActiveRecord::Base
    extend Devise::Models

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable, :trackable,
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable,  :validatable, 
         :omniauthable, omniauth_providers: [:facebook, :google_oauth2]
  include DeviseTokenAuth::Concerns::User

  before_create :generate_authentication_token


  def self.from_omniauth(auth)
    user = User.where(email: auth.info.email).first 
    # user = User.find_by(provider: auth[:provider], uid: auth[:uid])

    if user
      return user
    else
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.email = auth.info.email
        user.password = Devise.friendly_token[0, 20]
        user.name = auth.info.name   # assuming the user model has a name
        user.image = auth.info.image # assuming the user model has an image
        user.uid = auth.uid 
        user.provider = auth.provider 

      end
    end
  end

  def generate_authentication_token
    begin
      self.access_token = Devise.friendly_token
    end while self.class.exists?(access_token: access_token)
  end
end
