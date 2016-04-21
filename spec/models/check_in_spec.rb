require 'rails_helper'

describe CheckIn do
  fixtures :beacons, :events, :legacy_sheet_users, :users

  let(:beacon) { beacons(:roaming_beacon) }
  let(:event) { events(:unchecked_into_current_sloppy_moose) }
  let(:user) { users(:izzie) }
  let(:legacy_sheet_user) { legacy_sheet_users(:izzie) }
  let(:other_legacy_sheet_user) { legacy_sheet_users(:nancy) }
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

  describe 'validates user XOR legacy_sheet_user' do
    it 'is invalid without a user or legacy_sheet_user present' do
      check_in = CheckIn.create
      expect(check_in.errors[:base]).to include I18n.t('activerecord.errors.models.check_in.attributes.base.xor_blank')
    end

    it 'is invalid with mismatched user and legacy_sheet_user' do
      check_in = CheckIn.create(
        user: user,
        legacy_sheet_user: other_legacy_sheet_user
      )
      expect(check_in.errors[:base]).to include I18n.t('activerecord.errors.models.check_in.attributes.base.xor_present')
    end

    it 'is valid with both an equal user and legacy_sheet_user' do
      check_in = CheckIn.create(
        user: user,
        legacy_sheet_user: legacy_sheet_user
      )
      expect(check_in.errors[:base]).to be_empty
    end

    it 'is valid without a user and a legacy_sheet_user' do
      check_in = CheckIn.create(
        legacy_sheet_user: legacy_sheet_user
      )
      expect(check_in.errors[:base]).to be_empty
    end

    it 'is valid with a user and no legacy_sheet_user' do
      check_in = CheckIn.create(
        user: user
      )
      expect(check_in.errors[:base]).to be_empty
    end
  end
end
