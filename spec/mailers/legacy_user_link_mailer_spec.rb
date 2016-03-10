require 'rails_helper'

describe LegacyUserLinkMailer, type: :mailer do
  fixtures :legacy_sheet_check_ins, :legacy_sheet_users, :users

  let(:legacy_sheet_user) { legacy_sheet_users(:unconfirmed) }
  let(:user) { users(:unconfirmed) }

  describe '#confirm_link_email' do
    subject { described_class.confirm_link_email(user, matching_legacy_users) }

    context 'with a single LegacySheetUser match' do
      let(:matching_legacy_users) { LegacySheetUser.where(id: legacy_sheet_user) }

      it 'is correctly addressed' do
        expect(subject.to).to include 'rando@example.org'
        expect(subject.header[:to].value).to eql 'Rando Person <rando@example.org>'
      end

      it 'includes a subject' do
        expect(subject.subject).to eql 'Returning Sloppy Mooser: Link your account to retain credit for previous runs!'
      end

      it 'renders the single-match partial' do
        expect(subject.body.parts.last.body).to include 'Is this you?'
        expect(subject.body.parts.last.body).to_not include 'found several records'
      end
    end

    context 'with multiple LegacySheetUser matches' do
      let(:matching_legacy_users) do
        LegacySheetUser.where(id: [
          legacy_sheet_users(:unconfirmed).id,
          legacy_sheet_users(:misspelled_unconfirmed).id
        ])
      end

      it 'is correctly addressed' do
        expect(subject.to).to include 'rando@example.org'
        expect(subject.header[:to].value).to eql 'Rando Person <rando@example.org>'
      end

      it 'includes a subject' do
        expect(subject.subject).to eql 'Returning Sloppy Mooser: Link your account to retain credit for previous runs!'
      end

      it 'renders the multi-match partial' do
        expect(subject.body.parts.last.body).to include 'found several records'
        expect(subject.body.parts.last.body).to_not include 'Is this you?'
      end
    end
  end

  describe '#no_potential_links_email' do
    subject { described_class.no_potential_links_email(user) }

    it 'is correctly addressed' do
      expect(subject.to).to include 'rando@example.org'
      expect(subject.header[:to].value).to eql 'Rando Person <rando@example.org>'
    end

    it 'includes a subject' do
      expect(subject.subject).to eql 'Returning Sloppy Mooser: We could not find any of your previous runs :('
    end
  end
end
