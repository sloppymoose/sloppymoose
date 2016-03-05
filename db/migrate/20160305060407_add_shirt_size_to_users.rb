class AddShirtSizeToUsers < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.references :shirt_size, null: false
    end
  end
end
