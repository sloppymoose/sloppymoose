class CheckIn < ActiveRecord::Base
  include Authority::Abilities

  belongs_to :beacon
  belongs_to :user
  belongs_to :event

  validates :beacon,
    presence: true
  validates :user,
    presence: true
  validates :event,
    presence: true
  validates :event_id,
    uniqueness: { scope: :user_id }
end
