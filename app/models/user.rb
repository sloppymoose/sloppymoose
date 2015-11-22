class User < ActiveRecord::Base
  EmailAddress = /\A.+@[^.]+\..+\z/
  validates :email,
    format: { with: EmailAddress },
    length: { minimum: 5 },
    uniqueness: true
  validates :first_name,
    length: { minimum: 1 },
    presence: true
  validates :last_name,
    length: { minimum: 1 },
    presence: true
  validates :password,
    length: { minimum: 20 },
    presence: true
  validates :username,
    length: { minimum: 3, maximum: 20 },
    presence: true,
    uniqueness: true
end
