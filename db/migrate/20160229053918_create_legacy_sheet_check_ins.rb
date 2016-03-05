class CreateLegacySheetCheckIns < ActiveRecord::Migration
  def change
    create_table :legacy_sheet_check_ins do |t|
      t.belongs_to :legacy_sheet_user, null: false
      t.belongs_to :event, null: false, index: true
      t.date :created_on, null: false
      t.timestamps null: false
    end

    add_index :legacy_sheet_check_ins, [:legacy_sheet_user_id, :created_on], unique: true, name: :legacy_check_ins_on_user_id_and_created_on
  end
end
