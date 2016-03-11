class LinkLegacyUserToUser
  def self.perform(args)
    new.perform(*args)
  end

  def perform(user_id)
    user = User.find(user_id)
    matching_legacy_users = find_best_match_for_user(user)
    send_mail_to(user, matching_legacy_users)
  end

  # Returns the LegacySheetUser records that best match the User's details
  def find_best_match_for_user(user)
    LegacySheetUser.find_best_user_match(user)
  end

  def send_mail_to(user, matching_legacy_users)
    if matching_legacy_users
      mail_link_confirmation!(user, matching_legacy_users)
    else
      mail_link_not_found!(user)
    end
  end

  private

  def mail_link_confirmation!(user, matching_legacy_users)
    LegacyUserLinkMailer.confirm_link_email(user, matching_legacy_users).deliver
  end

  # TODO
  def mail_link_not_found!(user)
    LegacyUserLinkMailer.no_potential_links_email(user, matching_legacy_users).deliver
  end
end
