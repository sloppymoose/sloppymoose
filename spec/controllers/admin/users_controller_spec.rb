require 'spec_helper'

describe Admin::UsersController do
  describe '#index' do
    subject { get :index }

    it 'assigns to @users' do
      subject
      assert_equal assigns(:users), User.all
    end
  end
end
