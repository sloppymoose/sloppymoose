require 'authority/security_violation'

class AdminController < ApplicationController
  before_filter :admin_required!

protected

  def admin_required!
    return if current_user.try(:admin?)
    raise Authority::SecurityViolation.new(current_user, params['action'], self)
  end
end
