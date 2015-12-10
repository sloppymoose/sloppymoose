class Api::CheckInsController < ApiController
  def index
    @check_ins = current_user.check_ins
    respond_with(@check_in)
  end

  def create
    @check_in = current_user.check_ins.build(created_at: DateTime.now)
    @check_in.save
    respond_with(@check_in, location: nil)
  end
end
