require 'rails_helper'

describe 'API check-ins routing' do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  describe 'for a non-signed-in user' do
    it 'does not route GET /api/check_ins' do
      expect(get: '/api/check_ins').to_not be_routable
    end

    it 'does not route GET /api/check_ins/new' do
      expect(get: '/api/check_ins/new').to_not be_routable
    end

    it 'does not route POST /api/check_ins' do
      expect(post: '/api/check_ins').to_not be_routable
    end
  end

  describe 'for a signed-in user' do
    let(:current_user) { non_admin }

    it 'routes GET /api/check_ins to /api/check_ins#index' do
      expect(get: '/api/check_ins').to route_to(controller: 'api/check_ins', action: 'index')
    end

    it 'routes GET /api/check_ins/new to /api/check_ins#new' do
      expect(get: '/api/check_ins/new').to_not be_routable
    end

    it 'routes POST /api/check_ins to /api/check_ins#create' do
      expect(post: '/api/check_ins').to route_to(controller: 'api/check_ins', action: 'create')
    end

    it 'does not route GET /api/check_ins/1' do
      expect(get: '/api/check_ins/1').to_not route_to(controller: 'api/check_ins', action: 'show', id: '1')
    end

    it 'does not route PUT /api/check_ins/1' do
      expect(put: '/api/check_ins/1').to_not be_routable
    end

    it 'does not route PATCH /api/check_ins/1' do
      expect(patch: '/api/check_ins/1').to_not be_routable
    end

    it 'does not routes DELETE /check_ins/1' do
      expect(delete: '/api/check_ins/1').to_not be_routable
    end
  end
end
