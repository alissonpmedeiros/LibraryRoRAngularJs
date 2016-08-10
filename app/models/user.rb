class User < ActiveRecord::Base
  before_save -> do
    self.uid = SecureRandom.uuid
    skip_confirmation!
  end

  has_one :address

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
end
	