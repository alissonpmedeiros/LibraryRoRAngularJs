class User < ActiveRecord::Base
  before_save -> do
    self.uid = SecureRandom.uuid
    skip_confirmation!
  end

  has_one :address



  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/
  validates :email, presence: true, :uniqueness => true, format: { with: VALID_EMAIL_REGEX }

  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User
end
	