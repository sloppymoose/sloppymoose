# Service Account ID: sloppymoose@sloppy-moose.iam.gserviceaccount.com
class GoogleServiceAccount
  def perform(service_account_config_path)
    @service_account_config_path = service_account_config_path
    prompt_for_credentials unless File.exists?(@service_account_config_path)
    GoogleDrive::Session.from_service_account_key(@service_account_config_path)
  end

  private

  def prompt_for_credentials
    puts "No Google Service Account keys found at #{@service_account_config_path}"
    puts "\n"
    puts "Please follow the directions to create and download your Google Service Account keys at:"
    puts "\n"
    puts "  #{key_generation_url}"
    puts "\n"
    await_user_response_menu
  end

  def await_user_response_menu
    highline = HighLine.new
    highline.choose do |menu|
      menu.prompt = "Choose how to proceed:"
      menu.choice("Open directions in my web browser for me") do
        %x{open #{key_generation_url}}
        await_user_response_menu
      end
      menu.choice('I have generated and stored my Google Service Account keys. Proceed...') do
        # No-op
      end
      menu.choice('I have no idea what I am doing, please stop') do
        abort('Bye!')
      end
    end
  end

  def key_generation_url
    'https://github.com/gimite/google-drive-ruby/blob/6cbc37eb9f21961439f39bd43312f740501efae6/doc/authorization.md#on-behalf-of-no-existing-users-service-account'
  end
end
