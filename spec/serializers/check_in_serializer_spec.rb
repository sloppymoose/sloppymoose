require 'rails_helper'

describe CheckInSerializer do
  fixtures :users

  let(:user) { users(:izzie) }
  let(:check_in) { user.check_ins.create!(created_at: DateTime.now) }

  subject do
    ActiveModel::SerializableResource.new(check_in).serializable_hash
  end

  it 'serializes the resource' do
    expect(subject[:data]).to include :attributes
  end
end
