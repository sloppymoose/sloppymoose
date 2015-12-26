require 'rails_helper'

describe CheckInSerializer do
  fixtures :beacons, :events, :users

  let(:beacon) { beacons(:roaming_beacon) }
  let(:event) { events(:current_sloppy_moose) }
  let(:user) { users(:izzie) }
  let(:check_in) { user.check_ins.create!(beacon: beacon, event: event) }

  subject do
    ActiveModel::SerializableResource.new(check_in).serializable_hash
  end

  it 'serializes the resource' do
    expect(subject[:data]).to include :attributes
  end
end
