class LinkLegacyUserToUser
  def self.confirm_link(user_id)
    new.confirm_link(user_id)
  end

  def self.perform(user_id, legacy_sheet_user_id)
    new.perform(user_id, legacy_sheet_user_id)
  end

  def confirm_link(user_id)
    user = User.find(user_id)
    matching_legacy_users = find_best_match_for_user(user)
    send_mail_to(user, matching_legacy_users)
  end

  # Performs the actual linking of accounts
  def perform(user_id, legacy_sheet_user_id)
    user = User.find(user_id)
    legacy_sheet_user = LegacySheetUser.find(legacy_sheet_user_id)
    user.legacy_sheet_user = legacy_sheet_user
    if user.save
      legacy_sheet_user.check_ins.where(legacy: true).update_all(user_id: user.id)
      backfill_awarded_badges(user)
    end
  end

  # Returns the LegacySheetUser records that best match the User's details
  def find_best_match_for_user(user)
    LegacySheetUser.find_best_user_match(user)
  end

  def send_mail_to(user, matching_legacy_users)
    if user.legacy_link?
      Rails.logger.info("Skipping linking of legacy user: #{user.name} is already linked")
    elsif matching_legacy_users.size > 0
      mail_link_confirmation!(user, matching_legacy_users)
    else
      mail_link_not_found!(user)
    end
  end

  private

  # Add any badges that apply to legacy check-ins
  def backfill_awarded_badges(user)
    MeritRebuilder.new.rebuild_merit_for(user)
  end

  def mail_link_confirmation!(user, matching_legacy_users)
    LegacyUserLinkMailer.confirm_link_email(user, matching_legacy_users).deliver_now
  end

  # TODO
  def mail_link_not_found!(user)
    LegacyUserLinkMailer.no_potential_links_email(user).deliver_now
  end
end
