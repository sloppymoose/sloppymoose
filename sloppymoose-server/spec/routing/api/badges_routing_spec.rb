require 'rails_helper'

describe 'API check-ins routing' do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  describe 'for a non-signed-in user' do
    it 'does not route GET /api/badges' do
      expect(get: '/api/badges').to_not be_routable
    end

    it 'does not route GET /api/badges/new' do
      expect(get: '/api/badges/new').to_not be_routable
    end

    it 'does not route POST /api/badges' do
      expect(post: '/api/badges').to_not be_routable
    end
  end

  describe 'for a signed-in user' do
    let(:current_user) { non_admin }

    it 'routes GET /api/badges to /api/badges#index' do
      expect(get: '/api/badges').to route_to(controller: 'api/badges', action: 'index')
    end

    xit 'does not route GET /api/badges/new to /api/badges#new' do
      expect(get: '/api/badges/new').to_not be_routable
    end

    it 'does not route POST /api/badges to /api/badges#create' do
      expect(post: '/api/badges').to_not be_routable
    end

    it 'routes GET /api/badges/1' do
      expect(get: '/api/badges/1').to route_to(controller: 'api/badges', action: 'show', id: '1')
    end

    it 'does not route PUT /api/badges/1' do
      expect(put: '/api/badges/1').to_not be_routable
    end

    it 'does not route PATCH /api/badges/1' do
      expect(patch: '/api/badges/1').to_not be_routable
    end

    it 'does not routes DELETE /badges/1' do
      expect(delete: '/api/badges/1').to_not be_routable
    end
  end
end
