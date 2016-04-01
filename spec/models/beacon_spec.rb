require 'rails_helper'

describe Beacon do
  it 'exists' do
    expect(subject).to_not be_nil
  end

  describe '.legacy_beacon' do
    subject { described_class.legacy_beacon }

    it 'is a Beacon' do
      expect(subject).to be_a described_class
    end
  end
end
