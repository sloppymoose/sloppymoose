class CheckInAuthorizer < ApplicationAuthorizer
  def self.creatable_by?(user)
    user.admin?
  end

  def self.readable_by?(user)
    user.admin?
  end

  def self.updateable_by?(user)
    false
  end

  def self.deletable_by?(user)
    user.admin?
  end

  def updateable_by?(user)
    false
  end

  def deletable_by?(user)
    user.admin?
  end

  def readable_by?(user)
    user.admin? || resource.user_id == user.id
  end
end
