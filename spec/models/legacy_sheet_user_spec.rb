require 'rails_helper'

describe LegacySheetUser do
  fixtures :legacy_sheet_users, :shirt_sizes

  let(:legacy_sheet_user) { legacy_sheet_users(:alan) }
  let(:name) { 'TESTNAME' }
  let(:shirt_size) { shirt_sizes(:mens_medium) }

  it 'does not allow multiple users with the same shirt size' do
    described_class.create!(name: name, shirt_size_id: shirt_size.id)
    legacy_user = described_class.create(name: name, shirt_size_id: shirt_size.id)
    expect(legacy_user.errors.full_messages).to include 'Name has already been taken'
  end
end
