class LegacySheetUser < ActiveRecord::Base
  has_one :shirt_size
  has_many :legacy_sheet_check_ins
  has_many :events, through: :legacy_sheet_check_ins

  validates :name,
    presence: true,
    uniqueness: { scope: :shirt_size_id }
end
