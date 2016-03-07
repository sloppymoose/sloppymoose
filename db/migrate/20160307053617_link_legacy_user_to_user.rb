class LinkLegacyUserToUser < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.boolean :first_timer, default: false, null: false
      t.references :legacy_sheet_user
    end
  end
end
