class LegacySheetUser < ActiveRecord::Base
  has_one :shirt_size
  has_one :user
  has_many :check_ins, dependent: :destroy
  has_many :events, through: :check_ins

  validates :name,
    presence: true,
    uniqueness: { scope: :shirt_size_id }

  def self.find_best_user_match(user)
    includes(:check_ins, :user).
    # Calculate the similarity between the names of the two data sources
    select("similarity(#{table_name}.name, #{sanitize(user.name)}) as __sim__").
    # Include required columns
    select('*').
    # Users that have not already been linked
    where(users: { legacy_sheet_user_id: nil }).
    # Users with the *same* Shirt Size
    where(shirt_size_id: user.shirt_size_id).
    # Users with similar names
    where("similarity(#{table_name}.name, ?) > 0.3", user.name).
    # Rank by the result of the similarity comparison
    order('__sim__').
    # With _most_ similar first
    reverse_order
  end
end
