require 'rails_helper'

describe CheckInsController do
  fixtures :users

  let(:user) { users(:kyle) }

  describe '#index' do
    subject { get :index }

    it 'redirects non-signed in users' do
      subject
      expect(response).to have_http_status(:redirect)
    end

    context 'when signed in' do
      before { sign_in user }

      it 'assigns to @check_ins' do
        subject
        assert_equal assigns(:check_ins), user.check_ins
      end
    end
  end

  describe '#new' do
    subject { get :new }

    it 'redirects non-signed in users' do
      subject
      expect(response).to have_http_status(:redirect)
    end

    context 'when signed in' do
      before { sign_in user }

      it 'assigns to @check_in' do
        subject
        assert_kind_of CheckIn, assigns(:check_in)
      end
    end
  end

  describe '#create' do
    let(:params) { {} }

    subject { get :create, params }

    it 'redirects non-signed in users' do
      subject
      expect(response).to have_http_status(:redirect)
    end

    context 'when signed in' do
      before { sign_in user }

      context 'with valid params' do
        let(:params) { {} }

        it 'redirects' do
          subject
          expect(response).to redirect_to(root_path)
        end
      end
    end
  end
end
