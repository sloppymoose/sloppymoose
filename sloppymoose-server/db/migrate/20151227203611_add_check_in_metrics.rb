class AddCheckInMetrics < ActiveRecord::Migration
  def change
    change_table :check_ins do |t|
      t.decimal :accuracy, null: false
      t.string :proximity, null: false
      t.integer :rssi, null: false
    end
  end
end
