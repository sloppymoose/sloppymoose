require 'rails_helper'

describe CheckIn do
  fixtures :events, :users

  let(:event) { events(:current_sloppy_moose) }
  let(:user) { users(:izzie) }

  it 'exists' do
    expect(subject).to_not be_nil
  end

  it 'does not allow multiple check ins per event' do
    event.check_ins.create!(user: user)
    check_in = event.check_ins.create(user: user)
    expect(check_in.errors.full_messages).to include 'Event has already been checked in'
  end
end
