class Beacon < ActiveRecord::Base
  LegacyPseudoBeaconName = 'Legacy Check-In Sheet'

  has_many :events, through: :event_beacons
  has_many :event_beacons

  validates :identifier,
    presence: true
  validates :name,
    presence: true
  validates :uuid,
    presence: true

  def self.legacy_beacon
    where(name: LegacyPseudoBeaconName).first
  end
end
