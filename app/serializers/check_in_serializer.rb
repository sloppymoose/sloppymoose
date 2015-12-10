class CheckInSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :created_at, :created_on, :updated_at
end
