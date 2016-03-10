class ApplicationMailer < ActionMailer::Base
  default from: Rails.application.secrets.action_mailer_email
  layout 'mailer'
end
