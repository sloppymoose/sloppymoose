class CheckIn < ActiveRecord::Base
  include Authority::Abilities

  belongs_to :beacon
  belongs_to :user
  belongs_to :event

  validates :accuracy,
    presence: true,
    numericality: { greater_than: 0 }
  validates :beacon,
    presence: true
  validates :user,
    presence: true
  validates :event,
    presence: true
  validates :event_id,
    uniqueness: { scope: :user_id }
  validates :proximity,
    presence: true,
    inclusion: { in: %w{far near immediate unknown} }
  validates :rssi,
    presence: true,
    numericality: { greater_than_or_equal_to: -100, less_than_or_equal_to: 0 }
end
