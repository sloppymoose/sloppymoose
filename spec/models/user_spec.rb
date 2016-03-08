require 'rails_helper'

describe User do
  it 'exists' do
    expect(subject).to_not be_nil
  end

  describe '#after_confirmation' do
    xit 'links to a legacy user if not a first-time member' do
    end

    xit 'does NOT link to a legacy user for first-time members' do
    end
  end
end
