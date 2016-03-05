class GoogleAuthNative
  RefreshPath = '.oauth_refresh_token'

  def perform(oauth_client_id, oauth_client_secret)
    @oauth_client_id, @oauth_client_secret = oauth_client_id, oauth_client_secret
    @google_api = SheetMapper::ApiClient.new
    login
    persist_refresh_token!
    @google_api
  end

  def login
    @google_api.native_login(@oauth_client_id, @oauth_client_secret, cached_refresh_token)
  end

  def persist_refresh_token!
    refresh_token = @google_api.refresh_token
    return if cached_refresh_token == refresh_token
    print "\nPersisting OAuth Refresh Token for later use..."
    open(RefreshPath, 'w', 0600) do |f|
      f.puts(refresh_token)
    end
    print "  Completed."
  end

  def cached_refresh_token
    @cached_refresh_token ||= begin
      File.open(RefreshPath, &:gets).chomp if File.exists?(RefreshPath)
    end
  end
end
