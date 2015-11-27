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

  describe '#new' do
    subject { get :new }

    it 'assigns to @check_in' do
      subject
      assert_kind_of CheckIn, assigns(:check_in)
    end
  end

  describe '#create' do
    let(:params) { {} }

    subject { post :create, params }

    it 'redirects to the new resource' do
      subject
      expect(response).to redirect_to(root_path)
    end
  end
end
