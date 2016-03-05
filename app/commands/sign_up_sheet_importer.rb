class SignUpSheetImporter
  SheetBlackList = ['Orirginal', 'Sheet2']
  LegacySheetTitle = '2014'

  def perform(oauth_client_id, spreadsheet_key, key_path = '')
    @oauth_client_id, @spreadsheet_key, @key_path = oauth_client_id, spreadsheet_key, key_path
    strategy, params = prompt_for_strategy!
    @google_api = strategy.new.perform(*params.values)
    fetch_sign_ins!.map(&method(:process_sign_ins))
  end

  def fetch_sign_ins!
    puts
    puts "Fetching Sign Ins..."
    options = {
      mapper: SignInSheetMapper,
      key: @spreadsheet_key,
      session: @google_api.session
    }
    sheet = SheetMapper::Spreadsheet.new(options)
    sheet.spreadsheet.worksheets.reject do |worksheet|
      SheetBlackList.include? worksheet.title
    end.map do |worksheet|
      SheetMapper::Collection.new(sheet, worksheet)
    end
  end

  def process_sign_ins(sign_ins)
    puts %Q[  Processing "#{sign_ins.worksheet.title}"]
    sign_ins.each do |sign_in|
      LegacySheetUser.transaction do
        legacy_sheet_user = build_user(sign_in, sign_ins.worksheet.title)

        (8..68).each do |col|
          next if sign_in.data[col - 1].blank?
          starts_at, event = build_event(sign_ins, col)
          check_in = legacy_sheet_user.legacy_sheet_check_ins.where(
            created_on: starts_at.to_s(:db),
            event_id: event.id
          ).first_or_initialize
          finalize_record(check_in)
        end
      end
    end

    puts "\n"
  end

  private

  def prompt_for_strategy!
    highline = HighLine.new
    highline.choose do |menu|
      menu.prompt = "Please choose an OAuth Strategy:  "
      menu.choice(service_label) do
        [
          GoogleAuthService,
          oauth_client_id: @oauth_client_id,
          service_email: ENV['GOOGLE_SERVICE_EMAIL'],
          key_path: @key_path
        ]
      end
      menu.choice(native_label) do
        [
          GoogleAuthNative,
          oauth_client_id: @oauth_client_id,
          oauth_client_secret: ENV['GOOGLE_CLIENT_SECRET']
        ]
      end
    end
  end

  def native_label
    lbl = 'User Consent'
    lbl << ' (recommended)' if @key_path.blank?
    lbl
  end

  def service_label
    lbl = 'Stored P12 Key'
    lbl << ' (recommended)' unless @key_path.blank?
    lbl
  end

  def build_user(sign_in, title)
    shirt_size = build_shirt_size(sign_in)

    legacy_sheet_user = LegacySheetUser.where(
      name: "#{sign_in.first_name} #{sign_in.last_name}",
      shirt_size_id: shirt_size.try(:id)
    ).first_or_create!
    legacy_sheet_user.shirt_awarded = sign_in.shirt_awarded.present?
    legacy_sheet_user.legacy_sign_ins = sign_in.from_earlier if title == LegacySheetTitle
    legacy_sheet_user.save!
    legacy_sheet_user
  end

  def build_shirt_size(sign_in)
    shirt_size = ShirtSize.where(name: sign_in.shirt_size).first_or_create
    shirt_size = nil unless shirt_size.valid?
    shirt_size
  end

  def build_event(sign_ins, col)
    starts_at = Time.parse("#{sign_ins.cell(1, col)} 6:00pm")
    event = Event.where(
      name: "Sloppy Moose #{starts_at.strftime('%m/%d/%Y')}",
      starts_at: starts_at,
      public: true
    ).first_or_create!
    [starts_at, event]
  end

  def finalize_record(check_in)
    if check_in.new_record?
      check_in.save
      if check_in.errors.any?
        puts "   Legacy check-in failed for #{check_in.legacy_sheet_user.name} on #{check_in.event.starts_at}"
      else
        puts "   Legacy check-in created for #{check_in.legacy_sheet_user.name} on #{check_in.event.starts_at}"
      end
    else
      puts "   Skipping existing check-in for #{check_in.legacy_sheet_user.name} on #{check_in.event.starts_at}"
    end
  end
end
