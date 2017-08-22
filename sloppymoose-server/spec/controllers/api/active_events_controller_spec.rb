require 'rails_helper'

describe Api::ActiveEventsController do
  fixtures :users

  let(:user) { users(:izzie) }

  before { sign_in user }

  describe '#index' do
    subject { get :index, format: :json }

    context 'with active events present' do
      it 'assigns to @events' do
        subject
        expect(assigns(:events).collect(&:public).uniq).to eq [true]
      end
    end

    context 'with no active events' do
      before { Event.delete_all }

      it 'auto-creates an Event and assigns to @events' do
        subject
        expect(assigns(:events).collect(&:public).uniq).to eq [true]
      end
    end
  end
end
