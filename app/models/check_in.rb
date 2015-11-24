class CheckIn < ActiveRecord::Base
  validates :user, presence: true
  validates :created_on,
    presence: true,
    uniqueness: { scope: :user_id }

  belongs_to :user

  def created_at=(val)
    self.created_on = timestamp_key(val)
    super
  end

protected

  def timestamp_key(timestamp)
    timestamp ||= DateTime.now
    timestamp.beginning_of_day.utc.to_date
  end
end
