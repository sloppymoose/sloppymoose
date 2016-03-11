require 'rails_helper'

describe 'linked legacy accounts routing' do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  describe 'for a non-signed-in user' do
    it 'does not route GET /linked_legacy_accounts' do
      expect(get: '/check_ins').to_not be_routable
    end

    it 'does not route GET /linked_legacy_accounts/new' do
      expect(get: '/check_ins/new').to_not be_routable
    end

    it 'does not route POST /linked_legacy_accounts' do
      expect(post: '/check_ins').to_not be_routable
    end
  end

  describe 'for a signed-in user' do
    let(:current_user) { non_admin }

    it 'routes GET /linked_legacy_account to /linked_legacy_account#create' do
      expect(get: '/linked_legacy_account').to route_to(controller: 'linked_legacy_accounts', action: 'create')
    end

    it 'does not route GET /linked_legacy_account/new' do
      expect(get: '/linked_legacy_account/new').to_not be_routable
    end

    it 'routes POST /linked_legacy_account to /linked_legacy_account#create' do
      expect(get: '/linked_legacy_account').to route_to(controller: 'linked_legacy_accounts', action: 'create')
    end

    it 'does not route GET /linked_legacy_account/1' do
      expect(get: '/linked_legacy_account/1').to_not be_routable
    end

    it 'does not route PUT /linked_legacy_account/1' do
      expect(put: '/linked_legacy_account/1').to_not be_routable
    end

    it 'does not route PATCH /linked_legacy_account/1' do
      expect(patch: '/linked_legacy_account/1').to_not be_routable
    end

    it 'does not routes DELETE /linked_legacy_account/1' do
      expect(delete: '/linked_legacy_account/1').to_not be_routable
    end
  end
end
