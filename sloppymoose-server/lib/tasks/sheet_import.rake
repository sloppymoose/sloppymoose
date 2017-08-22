desc "Imports Sign In Sheet data"
task import_sheet: :environment do
  SignUpSheetImporter.new.perform(
    ENV['GOOGLE_CLIENT_ID'],
    ENV['GOOGLE_SHEET_KEY']
  )
end
