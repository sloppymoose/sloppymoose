require 'rails_helper'

describe CheckIn do
  fixtures :beacons, :events, :users

  let(:beacon) { beacons(:roaming_beacon) }
  let(:event) { events(:current_sloppy_moose) }
  let(:user) { users(:izzie) }

  it 'exists' do
    expect(subject).to_not be_nil
  end

  it 'does not allow multiple check ins per event' do
    event.check_ins.create!(beacon: beacon, user: user)
    check_in = event.check_ins.create(beacon: beacon, user: user)
    expect(check_in.errors.full_messages).to include 'Event has already been checked in'
  end
end
