require 'rails_helper'

describe 'Check-Ins requests' do
  fixtures :beacons, :events, :users

  let(:beacon) { beacons(:roaming_beacon) }
  let(:event) { events(:unchecked_into_current_sloppy_moose) }
  let(:user) { users(:izzie) }

  let(:issuance_params) do
    params.merge(
      user: {
        email: user.email,
        password: 'TEST PASSWORD'
      }
    )
  end
  let(:params) do
    {
      format: 'json',
      grant_type: 'password'
    }
  end
  let(:check_in_params) do
    {
      accuracy: 0.01,
      beacon_id: beacon.id,
      proximity: 'near',
      rssi: -20
    }
  end
  let(:user) { users(:unconfirmed) }

  describe '#create' do
    before do
      # Sign-in
      post '/oauth/token', issuance_params
      json = JSON.parse(response.body)
      # Use the token
      @access_token = json['access_token']
    end

    subject do
      params.merge!(
        check_in: check_in_params.merge(event_id: event.id)
      )
      post '/api/check_ins', params, { 'HTTP_AUTHORIZATION' => "Bearer #{@access_token}" }
    end

    it 'grants a first-check-in badge on first check-in' do
      subject
      expect(response.status).to eql 201
      expect(user.reload.badges.collect(&:name)).to eq ['first-check-in']
    end

    it 'grants a moose-shirt-awarded badge on fifth check-in' do
      4.times do |i|
        event = Event.create!(name: "Event #{i}", starts_at: i.days.ago, created_at: i.days.ago, updated_at: i.days.ago)
        params.merge!(
          check_in: check_in_params.merge(event_id: event.id)
        )
        post '/api/check_ins', params, { 'HTTP_AUTHORIZATION' => "Bearer #{@access_token}" }
      end

      subject
      expect(response.status).to eql 201
      expect(user.reload.badges.collect(&:name)).to include 'moose-shirt-awarded'
    end
  end
end
