require 'rails_helper'

describe User do
  subject { described_class.new }

  describe '#after_confirmation' do
    xit 'links to a legacy user if not a first-time member' do
    end

    xit 'does NOT link to a legacy user for first-time members' do
    end
  end

  describe '#legacy_link?' do
    it 'returns TRUE when linked to a LegacySheetUser' do
      expect(User.new(legacy_sheet_user_id: 1).legacy_link?).to eql true
    end

    it 'returns FALSE when linked to a LegacySheetUser' do
      expect(User.new(legacy_sheet_user_id: nil).legacy_link?).to eql false
    end
  end
end
