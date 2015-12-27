require 'rails_helper'

describe CheckInSerializer do
  fixtures :beacons, :check_ins, :events, :users

  let(:beacon) { beacons(:roaming_beacon) }
  let(:event) { events(:current_sloppy_moose) }
  let(:user) { users(:izzie) }
  let(:check_in) { check_ins(:current_sloppy_moose_check_in) }

  subject do
    ActiveModel::SerializableResource.new(check_in).serializable_hash
  end

  it 'serializes the resource' do
    expect(subject[:data]).to include :attributes
  end
end
