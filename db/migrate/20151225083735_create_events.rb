class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.boolean :public, null: false, default: true
      t.boolean :auto_created, null: false, default: false
      t.datetime :starts_at, null: false
      t.timestamps null: false
    end

    # Remove old uniqueness validation
    remove_index :check_ins, column: [:user_id, :created_on], unique: true
    remove_column :check_ins, :created_on

    # Add new uniqueness validation
    add_reference :check_ins, :event, index: true
    add_index :check_ins, [:user_id, :event_id], unique: true
  end
end
