require 'rails_helper'

describe Api::CheckInsController do
  fixtures :users

  let(:user) { users(:izzie) }

  before { sign_in user }

  describe '#index' do
    subject { get :index, format: :json }

    it 'assigns to @check_ins' do
      subject
      assert_equal assigns(:check_ins), user.check_ins
    end
  end

  describe '#create' do
    let(:params) do
      {
        format: :json
      }
    end

    subject { post :create, params }

    it 'returns the new resource' do
      subject
      expect(response).to have_http_status(:created)
    end
  end
end
