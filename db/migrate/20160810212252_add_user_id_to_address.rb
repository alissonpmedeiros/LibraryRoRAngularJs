class AddUserIdToAddress < ActiveRecord::Migration
  def change
    add_reference :addresses, :user
  end
end
