require 'spec_helper'

describe 'admin users routing' do
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
