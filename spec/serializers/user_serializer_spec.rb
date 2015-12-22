require 'rails_helper'

describe UserSerializer do
  fixtures :users

  let(:user) { users(:izzie) }

  subject do
    ActiveModel::SerializableResource.new(user).serializable_hash
  end

  it 'serializes the resource' do
    expect(subject[:data]).to include :attributes
  end
end
