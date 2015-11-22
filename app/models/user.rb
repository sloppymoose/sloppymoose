class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable
  validates :email,
    uniqueness: true
  validates :first_name,
    length: { minimum: 1 },
    presence: true
  validates :last_name,
    length: { minimum: 1 },
    presence: true
  validates :username,
    length: { minimum: 3, maximum: 20 },
    presence: true,
    uniqueness: true
end
