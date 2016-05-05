class Api::BadgesController < ApiController
  def index
    @badges = current_user.badges
    respond_with(@badges)
  end

  def show
    @badge = current_user.badges.find{|b| b.id == params[:id] }
    respond_with(@badge)
  end
end
