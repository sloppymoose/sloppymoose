class Event < ActiveRecord::Base
  has_many :beacons, through: :event_beacons
  has_many :check_ins
  has_many :event_beacons
  has_many :users, through: :check_ins

  validates :starts_at,
    presence: true

  scope :active, -> {
    where(public: true)
      .where('starts_at >= ?', Time.zone.now.beginning_of_day)
      .where('starts_at <= ?', Time.zone.now)
  }

  def self.auto_create!
    starts_at = Time.now.floor_to(15.minutes)
    beacon = Beacon.where(default: true).first!
    beacon.events.create!(
      auto_created: true,
      name: "Sloppy Moose #{starts_at.strftime('%m/%d/%Y')}",
      public: true,
      starts_at: starts_at
    )
  end
end
