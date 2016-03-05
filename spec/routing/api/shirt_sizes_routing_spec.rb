require 'rails_helper'

describe 'API shirt_sizes routing' do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  describe 'for a non-signed-in user' do
    it 'routes GET /api/shirt_sizes to /api/shirt_sizes#index' do
      expect(get: '/api/shirt_sizes').to route_to(controller: 'api/shirt_sizes', action: 'index')
    end

    it 'does not route GET /api/shirt_sizes/new' do
      expect(get: '/api/shirt_sizes/new').to_not be_routable
    end

    it 'does not route POST /api/shirt_sizes' do
      expect(post: '/api/shirt_sizes').to_not be_routable
    end
  end

  describe 'for a signed-in user' do
    let(:current_user) { non_admin }

    it 'routes GET /api/shirt_sizes to /api/shirt_sizes#index' do
      expect(get: '/api/shirt_sizes').to route_to(controller: 'api/shirt_sizes', action: 'index')
    end

    it 'routes GET /api/shirt_sizes/new to /api/shirt_sizes#new' do
      expect(get: '/api/shirt_sizes/new').to_not be_routable
    end

    it 'routes POST /api/shirt_sizes to /api/shirt_sizes#create' do
      expect(post: '/api/shirt_sizes').to_not be_routable
    end

    it 'does not route GET /api/shirt_sizes/1' do
      expect(get: '/api/shirt_sizes/1').to_not be_routable
    end

    it 'does not route PUT /api/shirt_sizes/1' do
      expect(put: '/api/shirt_sizes/1').to_not be_routable
    end

    it 'does not route PATCH /api/shirt_sizes/1' do
      expect(patch: '/api/shirt_sizes/1').to_not be_routable
    end

    it 'does not routes DELETE /shirt_sizes/1' do
      expect(delete: '/api/shirt_sizes/1').to_not be_routable
    end
  end
end
