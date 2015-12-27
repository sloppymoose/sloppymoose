class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :public, :created_at, :updated_at

  has_many :beacons
end
