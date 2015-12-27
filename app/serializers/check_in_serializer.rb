class CheckInSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :event_name, :updated_at

  def event_name
    object.event.name
  end

  belongs_to :event
end
