class Beacon < ActiveRecord::Base
  has_many :events, through: :event_beacons
  has_many :event_beacons

  validates :identifier,
    presence: true
  validates :name,
    presence: true
end
