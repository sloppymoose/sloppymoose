class Api::CheckInsController < ApiController
  def index
    @check_ins = current_user.check_ins
    respond_with(@check_ins)
  end

  def create
    @check_in = current_user.check_ins.create(creation_params)
    respond_with(@check_in, location: nil)
  end

private

  def creation_params
    params.require(:check_in).permit(:event_id)
  end
end
