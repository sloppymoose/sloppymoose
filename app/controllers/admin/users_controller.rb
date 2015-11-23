module Admin
  class UsersController < AdminController
    def index
      @users = User.all
    end
  end
end
