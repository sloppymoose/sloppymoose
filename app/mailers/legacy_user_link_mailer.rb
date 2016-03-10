class LegacyUserLinkMailer < ApplicationMailer
  def confirm_link_email(user, matching_legacy_users)
    @user, @matching_legacy_users = user, matching_legacy_users
    mail(to: formatted_email_address(user), subject: 'Returning Sloppy Mooser: Link your account to retain credit for previous runs!')
  end

  def no_potential_links_email(user)
    @user = user
    mail(to: formatted_email_address(user), subject: 'Returning Sloppy Mooser: We could not find any of your previous runs :(')
  end

  private

  def formatted_email_address(user)
    "#{user.name} <#{user.email}>"
  end
end
