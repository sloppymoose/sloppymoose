require 'rails_helper'

describe 'check-ins routing' do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  describe 'for a non-signed-in user' do
    it 'does not route GET /check_ins' do
      expect(get: '/check_ins').to_not be_routable
    end

    it 'does not route GET /check_ins/new' do
      expect(get: '/check_ins/new').to_not be_routable
    end

    it 'does not route POST /check_ins' do
      expect(post: '/check_ins').to_not be_routable
    end
  end

  describe 'for a signed-in user' do
    let(:current_user) { non_admin }

    it 'routes GET /check_ins to /check_ins#index' do
      expect(get: '/check_ins').to route_to(controller: 'check_ins', action: 'index')
    end

    it 'does not route GET /check_ins/new' do
      expect(get: '/check_ins/new').to_not be_routable
    end

    it 'does route POST /check_ins' do
      expect(post: '/check_ins').to_not be_routable
    end

    it 'does not route GET /check_ins/1' do
      expect(get: '/check_ins/1').to_not be_routable
    end

    it 'does not route PUT /check_ins/1' do
      expect(put: '/check_ins/1').to_not be_routable
    end

    it 'does not route PATCH /check_ins/1' do
      expect(patch: '/check_ins/1').to_not be_routable
    end

    it 'does not routes DELETE /check_ins/1' do
      expect(delete: '/check_ins/1').to_not be_routable
    end
  end
end
