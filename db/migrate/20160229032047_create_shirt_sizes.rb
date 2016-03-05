class CreateShirtSizes < ActiveRecord::Migration
  def change
    create_table :shirt_sizes do |t|
      t.string :name, null: false
      t.timestamps
    end

    add_index :shirt_sizes, :name, unique: true
  end
end
