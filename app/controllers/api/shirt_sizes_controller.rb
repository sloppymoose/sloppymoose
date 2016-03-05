class Api::ShirtSizesController < ApiController
  def index
    @shirt_sizes = ShirtSize.all
    respond_with(@shirt_sizes)
  end
end
