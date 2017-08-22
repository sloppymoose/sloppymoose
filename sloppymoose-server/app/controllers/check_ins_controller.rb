class CheckInsController < ApplicationController
  def index
    @check_ins = current_user.check_ins
  end
end
