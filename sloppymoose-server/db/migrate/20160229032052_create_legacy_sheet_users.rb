class CreateLegacySheetUsers < ActiveRecord::Migration
  def change
    create_table :legacy_sheet_users do |t|
      t.string :name, null: false
      t.integer :legacy_sign_ins, default: 0
      t.integer :shirt_size_id
      t.boolean :shirt_awarded, default: false
      t.timestamps
    end

    add_index :legacy_sheet_users, [:name, :shirt_size_id], unique: true
  end
end
