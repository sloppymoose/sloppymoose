class MergeLegacySheetCheckInsWithCheckIns < ActiveRecord::Migration
  def up
    change_column :check_ins, :user_id, :integer, null: true
    add_column :check_ins, :legacy, :boolean, null: false, default: false
    add_column :check_ins, :legacy_sheet_user_id, :integer
    drop_table :legacy_sheet_check_ins
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
