require 'rails_helper'

describe Admin::UsersController do
  fixtures :users

  let(:user) { users(:kyle) }

  before { sign_in user }

  describe '#index' do
    subject { get :index }

    it 'assigns to @users' do
      subject
      assert_equal assigns(:users), User.all
    end
  end
end
