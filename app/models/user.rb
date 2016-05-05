class User < ActiveRecord::Base
  has_merit

  include Authority::UserAbilities
  include Authority::Abilities

  has_many :check_ins, dependent: :destroy
  has_many :events, through: :check_ins
  belongs_to :shirt_size
  belongs_to :legacy_sheet_user

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :async, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :doorkeeper

  validates :name,
    length: { minimum: 1 },
    presence: true
  validates :safety_waiver_acceptance,
    acceptance: true
  validates :shirt_size,
    presence: true

  MooseShirtBadge = Merit::Badge.find{|m| m.name == 'moose-shirt'}.first

  def award_first_check_in?
    check_ins.where(legacy: false).size === 1
  end

  def award_moose_shirt?
    !badges.collect(&:name).include?(MooseShirtBadge.name) && check_ins.size >= 5
  end

  def after_confirmation
    LinkLegacyUserToUser.delay.confirm_link(id) unless first_timer?
  end

  def legacy_link?
    legacy_sheet_user_id.present?
  end
end
