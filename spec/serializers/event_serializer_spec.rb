require 'rails_helper'

describe EventSerializer do
  fixtures :events, :users

  let(:event) { events(:current_sloppy_moose) }

  subject do
    ActiveModel::SerializableResource.new(event).serializable_hash
  end

  it 'serializes the resource' do
    expect(subject[:data]).to include :attributes
  end
end
