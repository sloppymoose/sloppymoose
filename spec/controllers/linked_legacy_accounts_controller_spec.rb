require 'rails_helper'

describe LinkedLegacyAccountsController do
  fixtures :users

  let(:user) { users(:izzie) }

  before { sign_in user }

  describe '#create' do
    subject { get :create }

    it 'exists' do
      expect(subject).to_not be_nil
    end
  end
end
