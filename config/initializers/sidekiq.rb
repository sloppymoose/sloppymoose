# Calculated from http://manuel.manuelles.nl/sidekiq-heroku-redis-calc/

Sidekiq.configure_server do |config|
  config.redis = {
    url: Rails.application.secrets.redis_url,
    size: 9
  }
end

Sidekiq.configure_client do |config|
  config.redis = {
    url: Rails.application.secrets.redis_url,
    size: 1
  }
end
