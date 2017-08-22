# Preview all emails at http://localhost:3000/rails/mailers/legacy_user_link_mailer
class LegacyUserLinkMailerPreview < ActionMailer::Preview
  def confirm_link_email
    LegacyUserLinkMailer.confirm_link_email(user, matching_legacy_users)
  end

  def confirm_link_email__multi
    # NOTE: This uses LegacySheetUser.all because we need to test for "many"
    # user instances and LegacySheetUser.find_best_user_match obviously doesn't
    # always return more than one record.
    #
    # So when you are scared becaused you think this email is weird because its
    # returning a bunch of non-matching records, its OK. That's by design!
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
