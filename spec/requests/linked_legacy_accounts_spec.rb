require 'rails_helper'

describe 'LinkedLegacyAccount requests' do
  fixtures :legacy_sheet_users, :users

  let(:access_token) do
    Doorkeeper::AccessToken.create!(
      application_id: nil,
      resource_owner_id: user.id
    )
  end
  let(:id) { 1 }

  describe '#create' do
    subject do
      get "/linked_legacy_account?access_token=#{access_token.token}&id=#{id}"
    end

    context 'when the User is already linked' do
      let(:id) { legacy_sheet_users(:izzie).id }
      let(:user) { users(:izzie) }

      it 'renders an error message' do
        subject
        expect(response).to render_template(:already_linked)
      end
    end

    context 'when :id is not for a matched LegacySheetUser' do
      let(:user) { users(:unconfirmed) }
      let(:id) { 999 }

      it 'renders a warning message' do
        subject
        expect(response).to render_template(:invalid_legacy_sheet_user)
      end
    end

    context 'with an unlinked User' do
      let(:id) { legacy_sheet_users(:unconfirmed).id }
      let(:user) { users(:unconfirmed) }

      it 'renders a successful message' do
        subject
        expect(response).to render_template(:create)
      end
    end
  end
end
