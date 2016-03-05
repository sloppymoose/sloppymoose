class SignInSheetMapper < SheetMapper::Base
  attr_reader :data
  attr_accessor :raw_worksheet

  HeaderRow = 1
  columns :first_name, :last_name, :shirt_size, :shirt_awarded,
          :total, :from_earlier

  def valid_row?
    !header_row? && name?
  end

  def name
    "#{self[:first_name]} #{self[:last_name]}"
  end

  def name?
    name.present?
  end

  def header_row?
    self.pos <= HeaderRow
  end
end
