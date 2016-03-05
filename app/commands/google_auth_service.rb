class GoogleAuthService
  def perform(oauth_client_id, service_email, key_path = '')
    @key_path = key_path
    prompt_for_key_path if @key_path.blank?
    google_api = SheetMapper::ApiClient.new()
    google_api.service_login(oauth_client_id, service_email, key_path)
    google_api
  end

  def prompt_for_key_path
    highline = HighLine.new
    @key_path = highline.ask("Enter the path to the P12 Key file:  ")
  end
end
