require 'rails_helper'

describe Api::ShirtSizesController do
  fixtures :shirt_sizes, :users

  describe '#index' do
    subject { get :index, format: :json }

    it 'assigns to @shirt_sizes' do
      subject
      expect(assigns(:shirt_sizes)).to_not be_empty
    end
  end
end
