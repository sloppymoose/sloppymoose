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
    LegacySheetUser.
      includes(:legacy_sheet_check_ins, :user).
      # Calculate the similarity between the names of the two data sources
      select("similarity(legacy_sheet_users.name, #{LegacySheetUser.sanitize(user.name)}) as __sim__").
      # Include required columns
      select('*').
      # Users that have not already been linked
      where(users: { legacy_sheet_user_id: nil }).
      # Users with the *same* Shirt Size
      where(shirt_size_id: user.shirt_size_id).
      # Users with similar names
      where('similarity(legacy_sheet_users.name, ?) > 0.3', user.name).
      # Rank by the result of the similarity comparison
      order('__sim__').
      # With _most_ similar first
      reverse_order
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
