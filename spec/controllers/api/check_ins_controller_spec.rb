require 'rails_helper'

describe Api::CheckInsController do
  fixtures :beacons, :events, :users

  let(:beacon) { beacons(:roaming_beacon) }
  let(:event) { events(:current_sloppy_moose) }
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
        check_in: {
          beacon_id: beacon.id,
          event_id: event.id
        },
        format: :json
      }
    end

    subject { post :create, params }

    it 'returns the new resource' do
      subject
      expect(response).to have_http_status(:created)
    end

    it 'includes the :event association' do
      subject
      expect(JSON.parse(response.body)['included'][0]['type']).to eq 'events'
    end
  end
end
