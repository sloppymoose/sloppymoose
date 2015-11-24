require 'rails_helper'

describe AdminController do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:non_admin) { users(:izzie) }

  controller(described_class) do
    def index
      head 204
    end
  end

  describe '#index' do
    subject { get :index }

    describe 'for a unsigned in request' do
      it 'is forbidden' do
        subject
        expect(response).to have_http_status(:forbidden)
      end
    end

    describe 'for a non-admin user' do
      before { sign_in non_admin }

      it 'is forbidden' do
        subject
        expect(response).to have_http_status(:forbidden)
      end
    end

    describe 'for an admin user' do
      before { sign_in admin }

      it 'is not forbidden' do
        subject
        expect(response).to_not have_http_status(:forbidden)
      end
    end
  end
end
