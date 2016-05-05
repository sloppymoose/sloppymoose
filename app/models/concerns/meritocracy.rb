module Meritocracy
  FirstCheckInBadge = Merit::Badge.find{|m| m.name == 'first-check-in'}.first
  MooseShirtBadge = Merit::Badge.find{|m| m.name == 'moose-shirt'}.first

  module User
    def award_first_check_in?
      !badges.collect(&:name).include?(FirstCheckInBadge.name) &&
        check_ins.where(legacy: false).size >= 1
    end

    def award_moose_shirt?
      !badges.collect(&:name).include?(MooseShirtBadge.name) &&
        check_ins.size >= 5
    end
  end
end
