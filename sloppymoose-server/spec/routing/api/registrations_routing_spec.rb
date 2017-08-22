require 'rails_helper'

describe 'API users routing' do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  describe 'for a non-signed-in user' do
    it 'does not route GET /api/users' do
      expect(get: '/api/users').to_not be_routable
    end

    it 'does not route GET /api/users/new' do
      expect(get: '/api/users/new').to_not be_routable
    end

    it 'does not route GET /api/users/1' do
      expect(get: '/api/users/1').to_not be_routable
    end

    it 'routes POST /api/users to /api/users#create' do
      expect(post: '/api/users').to route_to(controller: 'api/registrations', action: 'create')
    end
  end

  describe 'for a signed-in user' do
    let(:current_user) { non_admin }

    it 'does not route GET /api/users' do
      expect(get: '/api/users').to_not be_routable
    end

    it 'does not route GET /api/users/new' do
      expect(get: '/api/users/new').to_not be_routable
    end

    it 'routes POST /api/users to /api/users#create' do
      expect(post: '/api/users').to_not be_routable
    end

    it 'does not route GET /api/check_ins/1' do
      expect(get: '/api/check_ins/1').to_not be_routable
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
