require 'rails_helper'

describe Api::RegistrationsController do
  describe '#create' do
    fixtures :shirt_sizes

    let(:params) do
      {
        format: :json,
        user: {
          email: 'testuser@example.org',
          name: 'FIRST LAST',
          password: 'TESTPASSWORD',
          password_confirmation: 'TESTPASSWORD',
          safety_waiver_accepted: '1',
          shirt_size_id: shirt_sizes(:mens_medium).id.to_s
        }
      }
    end

    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
    end

    subject { post :create, params }

    it 'returns the new resource' do
      subject
      body = JSON.parse(response.body)
      expect(response).to have_http_status(:created)
      expect(body['meta']).to include 'flash' => kind_of(String)
    end

    context 'with invalid params' do
      let(:params) do
        super().merge(
          user: {}
        )
      end

      it 'returns an error' do
        subject
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
