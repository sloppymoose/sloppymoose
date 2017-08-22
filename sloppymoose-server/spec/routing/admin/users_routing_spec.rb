require 'rails_helper'

describe 'admin users routing' do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  describe 'as a non-admin' do
    let(:current_user) { non_admin }

    it 'does not route GET /admin/users' do
      expect(get: '/admin/users').to_not be_routable
    end

    it 'does not route GET /admin/users/new' do
      expect(get: '/admin/users/new').to_not be_routable
    end

    it 'does not route POST /admin/users' do
      expect(post: '/admin/users').to_not be_routable
    end

    it 'does not route GET /admin/users/1' do
      expect(get: '/admin/users/1').to_not be_routable
    end

    it 'does not route PUT /admin/users/1' do
      expect(put: '/admin/users/1').to_not be_routable
    end

    it 'does not route PATCH /admin/users/1' do
      expect(patch: '/admin/users/1').to_not be_routable
    end

    it 'does not route DELETA /admin/users/1' do
      expect(delete: '/admin/users/1').to_not be_routable
    end
  end

  describe 'as an admin' do
    let(:current_user) { admin }

    it 'routes GET /admin/users to /admin/users#index' do
      expect(get: '/admin/users').to route_to(controller: 'admin/users', action: 'index')
    end

    it 'routes GET /admin/users/new to /admin/users#new' do
      expect(get: '/admin/users/new').to route_to(controller: 'admin/users', action: 'new')
    end

    it 'routes POST /admin/users to /admin/users#create' do
      expect(post: '/admin/users').to route_to(controller: 'admin/users', action: 'create')
    end

    it 'routes GET /admin/users/1 to /admin/users#show' do
      expect(get: '/admin/users/1').to route_to(controller: 'admin/users', action: 'show', id: '1')
    end

    it 'routes PUT /admin/users/1 to /admin/users#show' do
      expect(put: '/admin/users/1').to route_to(controller: 'admin/users', action: 'update', id: '1')
    end

    it 'routes PATCH /admin/users/1 to /admin/users#show' do
      expect(patch: '/admin/users/1').to route_to(controller: 'admin/users', action: 'update', id: '1')
    end

    it 'routes DELETA /admin/users/1 to /admin/users#show' do
      expect(delete: '/admin/users/1').to route_to(controller: 'admin/users', action: 'destroy', id: '1')
    end
  end
end
