class CheckInSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :updated_at

  belongs_to :event
end
