class CreateBeacons < ActiveRecord::Migration
  def change
    create_table :beacons do |t|
      t.string :name, null: false
      t.string :identifier, null: false
      t.string :uuid, limit: 36, null: false
      t.integer :major, null: false, default: 1
      t.integer :minor, null: false, default: 1
      t.boolean :default, null: false, default: false
      t.timestamps
    end

    add_column :check_ins, :beacon_id, :integer, null: false

    create_table :event_beacons do |t|
      t.belongs_to :beacon, null: false
      t.belongs_to :event, null: false
      t.timestamps
    end

    add_index :event_beacons, :beacon_id
    add_index :event_beacons, :event_id
  end
end
