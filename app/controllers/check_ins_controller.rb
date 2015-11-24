class CheckInsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @check_ins = current_user.check_ins
  end

  def new
    @check_in = current_user.check_ins.build
  end

  def create
    @check_in = current_user.check_ins.build(created_at: DateTime.now)
    if @check_in.save
      flash[:notice] = 'You are checked in!'
      redirect_to root_path
    else
      render 'new'
    end
  end
end
