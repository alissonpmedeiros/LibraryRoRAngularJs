class Book < ActiveRecord::Base
  before_save {
  	self.title = title.downcase
  }	

  belongs_to :category
  has_and_belongs_to_many :authors
  accepts_nested_attributes_for :authors


end
