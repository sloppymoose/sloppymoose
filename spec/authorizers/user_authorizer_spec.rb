require 'rails_helper'

describe UserAuthorizer do
  fixtures :users

  let(:admin) { users(:kyle) }
  let(:user) { users(:izzie) }
  let(:other_user) { users(:unconfirmed) }

  describe 'creating' do
    it 'is allowed by an admin' do
      expect(described_class).to be_creatable_by(admin)
    end

    it 'is not allowed by a user' do
      expect(described_class).to_not be_creatable_by(user)
    end

    describe 'an instance' do
      subject { user.authorizer }

      it 'is allowed by an admin' do
        expect(subject).to be_creatable_by(admin)
      end

      it 'is allowed by the instance' do
        expect(subject).to_not be_creatable_by(user)
      end

      it 'is not allowed by a different instance' do
        expect(subject).to_not be_creatable_by(other_user)
      end
    end
  end

  describe 'reading' do
    it 'is allowed by an admin' do
      expect(described_class).to be_readable_by(admin)
    end

    it 'is allowed by a user' do
      expect(described_class).to be_readable_by(user)
    end

    describe 'an instance' do
      subject { user.authorizer }

      it 'is allowed by an admin' do
        expect(subject).to be_readable_by(admin)
      end

      it 'is allowed by the instance' do
        expect(subject).to be_readable_by(user)
      end

      it 'is not allowed by a different instance' do
        expect(subject).to be_readable_by(other_user)
      end
    end
  end

  describe 'updating' do
    it 'is allowed by an admin' do
      expect(described_class).to be_updateable_by(admin)
    end

    it 'is allowed by a user' do
      expect(described_class).to be_updateable_by(user)
    end

    describe 'an instance' do
      subject { user.authorizer }

      it 'is allowed by an admin' do
        expect(subject).to be_readable_by(admin)
      end

      it 'is allowed by the instance' do
        expect(subject).to be_updateable_by(user)
      end

      it 'is not allowed by a different instance' do
        expect(subject).to_not be_updateable_by(other_user)
      end
    end
  end

  describe 'deleting' do
    it 'is allowed by an admin' do
      expect(described_class).to be_deletable_by(admin)
    end

    it 'is allowed by a user' do
      expect(described_class).to_not be_deletable_by(user)
    end

    describe 'an instance' do
      subject { user.authorizer }

      it 'is allowed by an admin' do
        expect(subject).to be_readable_by(admin)
      end

      it 'is allowed by the instance' do
        expect(subject).to be_deletable_by(user)
      end

      it 'is not allowed by a different instance' do
        expect(subject).to_not be_deletable_by(other_user)
      end
    end
  end
end
