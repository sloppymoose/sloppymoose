class MeritRebuilder
  def perform
    Rails.logger.info("=> Starting rebuild of meritocracy...")
    User.all.each(&method(:rebuild_merit_for))
  end

  def rebuild_merit_for(user)
    Rails.logger.info("=> Rebuilding meritocracy of #{user.email}")
    Merit::Badge.all.each do |badge|
      award_method = "award_#{badge.name.underscore}?"
      if user.respond_to?(award_method)
        Rails.logger.info("   Checking #{badge.name} award criteria...")
        if user.public_send(award_method)
          user.add_badge(badge.id)
          Rails.logger.info("   Criteria met, badge added")
        else
          Rails.logger.info("   Criteria not met, skipping")
        end
      end
    end
  end
end
