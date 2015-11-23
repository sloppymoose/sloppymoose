class User::ParameterSanitizer < Devise::ParameterSanitizer
  def sign_in
    default_params.permit(:username, :email)
  end

  def sign_up
    default_params.permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
  end
end
