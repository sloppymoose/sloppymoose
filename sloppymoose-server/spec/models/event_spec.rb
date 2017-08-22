describe Event do
  fixtures :beacons, :events

  it 'exists' do
    expect(subject).to_not be_nil
  end

  describe '.active' do
    subject { described_class.active }

    it 'returns all active events' do
      expect(subject.size).to eql 2
    end
  end

  describe '.auto_create!' do
    subject { described_class.auto_create! }

    it 'generates a valid event' do
      expect(subject).to be_persisted
      expect(subject.beacons).to_not be_empty
      expect(subject.auto_created).to eq true
      expect(subject.starts_at).to be <= Time.now
    end
  end
end
