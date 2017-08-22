web: bundle exec rails server puma -b ${HOST:-0.0.0.0} -p ${PORT:-7000} -e ${RACK_ENV:-development}
worker: bundle exec sidekiq -C config/sidekiq.yml
