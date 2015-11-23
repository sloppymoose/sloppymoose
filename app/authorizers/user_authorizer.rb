class UserAuthorizer < ApplicationAuthorizer
  def self.creatable_by?(user)
    user.admin?
  end

  def self.readable_by?(user)
    user.is_a? User
  end

  def self.updateable_by?(user)
    user.is_a? User
  end

  def self.deletable_by?(user)
    user.admin?
  end

  def updateable_by?(user)
    user.admin? || resource.id == user.id
  end

  def deletable_by?(user)
    user.admin? || resource.id == user.id
  end
end
