require 'rails_helper'

describe CheckIn do
  fixtures :beacons, :events, :users

  let(:beacon) { beacons(:roaming_beacon) }
  let(:event) { events(:unchecked_into_current_sloppy_moose) }
  let(:user) { users(:izzie) }
  let(:beacon_metrics) do
    {
      accuracy: 0.1,
      proximity: 'near',
      rssi: -20
    }
  end

  it 'does not allow multiple check ins per event' do
    event.check_ins.create!(beacon_metrics.merge(beacon: beacon, user: user))
    check_in = event.check_ins.create(beacon_metrics.merge(beacon: beacon, user: user))
    expect(check_in.errors.full_messages).to include 'Event has already been checked in'
  end
end
