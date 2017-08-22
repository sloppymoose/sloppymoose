class EventBeacon < ActiveRecord::Base
  belongs_to :beacon
  belongs_to :event, autosave: true

  validates :beacon,
    presence: true
  validates :event,
    presence: true

  accepts_nested_attributes_for :event
end
