class Loan < ActiveRecord::Base
  belongs_to :admin, class_name: 'User'
  belongs_to :user
  belongs_to :book
  belongs_to :fine

end
