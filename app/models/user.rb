class User < ActiveRecord::Base
  include Authority::UserAbilities
  include Authority::Abilities

  has_many :check_ins
  has_many :events, through: :check_ins
  belongs_to :shirt_size

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :async, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :doorkeeper

  validates :email,
    uniqueness: true
  validates :name,
    length: { minimum: 1 },
    presence: true
  validates :safety_waiver_acceptance,
    acceptance: true
  validates :shirt_size,
    presence: true
end
