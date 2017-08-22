# Routing spec helpers needed in order to get Devise's #authenticate and
# #authenticated route helpers to work.
#
# See also:
#   * https://github.com/plataformatec/devise/issues/1670#issuecomment-122295749
#
module Devise
  module RouteHelpers
    def self.included(klass)
      RSpec.configure do |c|
        c.before do
          simulate_running_with_devise if defined?(simulate_running_with_devise)
        end
      end
    end

    def _current_user
      return current_user if defined?(current_user)
      nil
    end

    def _authenticated?
      return authenticated? if defined?(authenticated?)
      _current_user.present?
    end

    def _warden
      return warden if defined?(warden)
      instance_double('Warden::Proxy').tap do |warden|
        allow(warden).to receive(:authenticate?).with(scope: nil)
          .and_return(_authenticated?)
        allow(warden).to receive(:authenticate!).with(scope: :user)
          .and_return(_authenticated?)
        allow(warden).to receive(:user).with(:user).and_return(_current_user)
      end
    end

    def simulate_running_with_devise
      stub_const(
        'Rack::MockRequest::DEFAULT_ENV',
        Rack::MockRequest::DEFAULT_ENV.merge('warden' => _warden),
      )
    end
  end
end
