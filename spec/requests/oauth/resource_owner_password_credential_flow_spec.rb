require 'rails_helper'

describe 'OAuth2 Resource Password Credential Flow' do
  fixtures :users

  let(:user) { users(:izzie) }
  let(:params) do
    {
      format: 'json',
      grant_type: 'password'
    }
  end

  context 'with valid credentials' do
    let(:issuance_params) do
      params.merge(
        user: {
          email: user.email,
          password: 'TEST PASSWORD'
        }
      )
    end

    let(:refresh_params) do
      params.merge(
        grant_type: 'refresh_token'
      )
    end

    it 'returns a usable OAuth2 Refresh Token' do
      # Get a token
      post '/oauth/token', issuance_params
      json = JSON.parse(response.body)
      expect(response.status).to eql 200
      expect(json['access_token']).to match(/\w{64}/)
      expect(json['refresh_token']).to match(/\w{64}/)

      # Refresh the token
      params = refresh_params.merge(refresh_token: json['refresh_token'])
      post '/oauth/token', params, { 'HTTP_AUTHORIZATION' => "Bearer #{json['access_token']}" }
      json = JSON.parse(response.body)
      expect(response.status).to eql 200

      # Use the token
      access_token = json['access_token']
      get '/check_ins', {}, { 'HTTP_AUTHORIZATION' => "Bearer #{access_token}" }
      expect(response.status).to eql 200
    end
  end

  context 'with invalid credentials' do
    let(:params) do
      super().merge(
        user: {
          email: user.email,
          password: 'BAD PASSWORD'
        }
      )
    end

    it 'returns an error' do
      post '/oauth/token', params
      expect(response.status).to eql 401
    end
  end

  context 'for an unknown user' do
    let(:params) do
      super().merge(
        user: {
          email: Time.now.to_s,
          password: 'TEST PASSWORD'
        }
      )
    end

    it 'returns an error' do
      post '/oauth/token', params
      expect(response.status).to eql 401
    end
  end
end
