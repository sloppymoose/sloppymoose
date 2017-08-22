class SimplifyUserRecord < ActiveRecord::Migration
  def change
    rename_column :users, :first_name, :name
    remove_column :users, :last_name
    remove_column :users, :username
  end
end
