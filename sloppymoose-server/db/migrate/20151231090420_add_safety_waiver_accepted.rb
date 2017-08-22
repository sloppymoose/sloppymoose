class AddSafetyWaiverAccepted < ActiveRecord::Migration
  def change
    change_table :users do |t|
      t.string :safety_waiver_accepted, null: false, default: '0', limit: 1
    end
  end
end
