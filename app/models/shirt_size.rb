class ShirtSize < ActiveRecord::Base
  belongs_to :legacy_sheet_users

  validates :name,
    presence: true,
    uniqueness: true
end
