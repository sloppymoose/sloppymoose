class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :errors, :created_at, :updated_at
end
