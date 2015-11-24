require 'rails_helper'

describe CheckIn do
  fixtures :users

  let(:user) { users(:izzie) }
  let(:today) { DateTime.now }
  let(:yesterday) { today.beginning_of_day - 1.second }

  it 'exists' do
    expect(subject).to_not be_nil
  end

  it 'allows one check in per day' do
    user.check_ins.create!(created_at: yesterday)
    check_in = user.check_ins.create(created_at: today)
    expect(check_in.errors[:created_on]).to be_empty
  end

  it 'does not allow multiple check ins per day' do
    user.check_ins.create!(created_at: today)
    check_in = user.check_ins.create(created_at: today)
    expect(check_in.errors[:created_on]).to include 'has already been recorded'
  end
end
