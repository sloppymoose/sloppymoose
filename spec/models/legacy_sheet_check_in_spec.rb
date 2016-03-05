require 'rails_helper'

describe LegacySheetCheckIn do
  fixtures :events, :legacy_sheet_users

  let(:event) { events(:unchecked_into_current_sloppy_moose) }
  let(:legacy_sheet_user) { legacy_sheet_users(:alan) }

  it 'does not allow multiple check ins per event' do
    event.legacy_sheet_check_ins.create!(legacy_sheet_user: legacy_sheet_user)
    check_in = event.legacy_sheet_check_ins.create(legacy_sheet_user: legacy_sheet_user)
    expect(check_in.errors.full_messages).to include 'Event has already been checked in'
  end
end
