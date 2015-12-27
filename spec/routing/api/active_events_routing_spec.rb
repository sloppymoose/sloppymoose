require 'rails_helper'

describe 'API check-ins routing' do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  describe 'for a non-signed-in user' do
    it 'does not route GET /api/active_events' do
      expect(get: '/api/active_events').to_not be_routable
    end

    it 'does not route GET /api/active_events/new' do
      expect(get: '/api/active_events/new').to_not be_routable
    end

    it 'does not route POST /api/active_events' do
      expect(post: '/api/active_events').to_not be_routable
    end
  end

  describe 'for a signed-in user' do
    let(:current_user) { non_admin }

    it 'routes GET /api/active_events to /api/active_events#index' do
      expect(get: '/api/active_events').to route_to(controller: 'api/active_events', action: 'index')
    end

    it 'does not route GET /api/active_events/new' do
      expect(get: '/api/active_events/new').to_not be_routable
    end

    it 'does not route POST /api/active_events' do
      expect(post: '/api/active_events').to_not be_routable
    end

    it 'does not route GET /api/active_events/1' do
      expect(get: '/api/active_events/1').to_not be_routable
    end

    it 'does not route PUT /api/active_events/1' do
      expect(put: '/api/active_events/1').to_not be_routable
    end

    it 'does not route PATCH /api/active_events/1' do
      expect(patch: '/api/active_events/1').to_not be_routable
    end

    it 'does not routes DELETE /active_events/1' do
      expect(delete: '/api/active_events/1').to_not be_routable
    end
  end
end
