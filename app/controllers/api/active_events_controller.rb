class Api::ActiveEventsController < ApiController
  def index
    Event.auto_create! if Event.active.none?
    @events = Event.active
    respond_with(@events)
  end
end
