# Preview all emails at http://localhost:3000/rails/mailers/legacy_user_link_mailer
class LegacyUserLinkMailerPreview < ActionMailer::Preview
  def confirm_link_email
    LegacyUserLinkMailer.confirm_link_email(user, matching_legacy_users)
  end

  def confirm_link_email__multi
    LegacyUserLinkMailer.confirm_link_email(user, LegacySheetUser.all.limit(5))
  end

  def no_potential_links_email
    LegacyUserLinkMailer.no_potential_links_email(user)
  end

  private

  def user
    User.first
  end

  def matching_legacy_users
    LinkLegacyUserToUser.new.find_best_match_for_user(user)
  end
end
