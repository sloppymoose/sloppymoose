class DevelopmentEmailInterceptor
  def self.delivering_email(message)
    message.to = [
      ENV['ACTION_MAILER_SANDBOX_ADDRESS']
    ]
  end
end

if Rails.env.development?
  ActionMailer::Base.register_interceptor(DevelopmentEmailInterceptor)
end
