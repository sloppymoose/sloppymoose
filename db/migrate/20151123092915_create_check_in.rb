class CreateCheckIn < ActiveRecord::Migration
  def change
    create_table :check_ins do |t|
      t.belongs_to :user, null: false
      t.date :created_on, null: false
      t.timestamps null: false
    end

    add_index :check_ins, [:user_id, :created_on], unique: true
  end
end
