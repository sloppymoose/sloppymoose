class LegacyUserLinkMailer < ApplicationMailer
  def confirm_link_email(user, matching_legacy_users)
    @user, @matching_legacy_users = user, matching_legacy_users
    @access_token = generate_access_token(user)
    mail(to: formatted_email_address(user), subject: 'Returning Sloppy Mooser: Link your account to retain credit for previous runs!')
  end

  def no_potential_links_email(user)
    @user = user
    mail(to: formatted_email_address(user), subject: 'Returning Sloppy Mooser: We could not find any of your previous runs :(')
  end

  private

  def generate_access_token(user)
    Doorkeeper::AccessToken.create!(
      application_id: application_id,
      resource_owner_id: user.id
    )
  end

  def application_id
    nil
  end

  def formatted_email_address(user)
    "#{user.name} <#{user.email}>"
  end
end
