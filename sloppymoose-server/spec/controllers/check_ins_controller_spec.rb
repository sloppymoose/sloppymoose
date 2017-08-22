require 'rails_helper'

describe CheckInsController do
  fixtures :users

  let(:user) { users(:izzie) }

  before { sign_in user }

  describe '#index' do
    subject { get :index }

    it 'assigns to @check_ins' do
      subject
      assert_equal assigns(:check_ins), user.check_ins
    end
  end
end
