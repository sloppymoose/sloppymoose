class CheckIn < ActiveRecord::Base
  include Authority::Abilities

  belongs_to :beacon
  belongs_to :user
  belongs_to :legacy_sheet_user
  belongs_to :event

  validates :accuracy,
    presence: true,
    numericality: { greater_than: 0 }
  validates :beacon,
    presence: true
  validates :event,
    presence: true
  validates :event_id,
    uniqueness: { scope: :user_id },
    unless: 'user_id.blank?'
  validates :proximity,
    presence: true,
    inclusion: { in: %w{far near immediate unknown} }
  validates :rssi,
    presence: true,
    numericality: { greater_than_or_equal_to: -100, less_than_or_equal_to: 0 }
  validate :user_xor_legacy_sheet_user

  private

  def user_xor_legacy_sheet_user
    if user.blank? && legacy_sheet_user.blank?
      errors.add(:base, :xor_blank)
    elsif user.present? && legacy_sheet_user.present?
      if user.legacy_sheet_user_id != legacy_sheet_user.id
        errors.add(:base, :xor_present)
      end
    end
  end
end
