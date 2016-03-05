class LegacySheetCheckIn < ActiveRecord::Base
  belongs_to :legacy_sheet_user
  belongs_to :event

  validates :legacy_sheet_user,
    presence: true
  validates :event,
    presence: true
  validates :event_id,
    uniqueness: { scope: :legacy_sheet_user_id }
end
