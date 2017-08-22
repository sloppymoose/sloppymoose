class Merit::BadgeSerializer < ActiveModel::Serializer
  attributes :display_name, :description, :id, :image_name, :name

  def display_name
    object.custom_fields[:display_name]
  end

  def image_name
    object.custom_fields[:display_name]
  end
end
