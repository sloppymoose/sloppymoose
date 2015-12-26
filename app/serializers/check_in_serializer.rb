class CheckInSerializer < ActiveModel::Serializer
  attributes :id, :event_id, :user_id, :created_at, :updated_at

  belongs_to :event
end
