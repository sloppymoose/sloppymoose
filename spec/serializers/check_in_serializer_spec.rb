require 'rails_helper'

describe CheckInSerializer do
  fixtures :events, :users

  let(:event) { events(:current_sloppy_moose) }
  let(:user) { users(:izzie) }
  let(:check_in) { user.check_ins.create!(event: event) }

  subject do
    ActiveModel::SerializableResource.new(check_in).serializable_hash
  end

  it 'serializes the resource' do
    expect(subject[:data]).to include :attributes
  end
end
