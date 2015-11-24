require 'rails_helper'

describe 'check-ins routing' do
  it 'routes GET /check_ins to /check_ins#index' do
    expect(get: '/check_ins').to route_to(controller: 'check_ins', action: 'index')
  end

  it 'routes GET /check_ins to /check_ins#new' do
    expect(get: '/check_ins/new').to route_to(controller: 'check_ins', action: 'new')
  end

  it 'routes POST /check_ins to /check_ins#create' do
    expect(post: '/check_ins').to route_to(controller: 'check_ins', action: 'create')
  end

  it 'does not route GET /check_ins/1 to /check_ins#show' do
    expect(get: '/admin/users/1').to_not route_to(controller: 'check_ins', action: 'show', id: '1')
  end

  it 'does not route PUT /check_ins/1 to /check_ins#show' do
    expect(put: '/check_ins/1').to_not route_to(controller: 'check_ins', action: 'update', id: '1')
  end

  it 'does not route PATCH /check_ins/1 to /check_ins#show' do
    expect(patch: '/check_ins/1').to_not route_to(controller: 'check_ins', action: 'update', id: '1')
  end

  it 'does not routes DELETE /check_ins/1 to /check_ins#show' do
    expect(delete: '/check_ins/1').to_not route_to(controller: 'check_ins', action: 'destroy', id: '1')
  end
end
