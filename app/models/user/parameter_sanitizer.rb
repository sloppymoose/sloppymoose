class User::ParameterSanitizer < Devise::ParameterSanitizer
  def sign_in
    default_params.permit(:email)
  end

  def sign_up
    default_params.permit(:name, :email, :password, :password_confirmation, :safety_waiver_accepted, :shirt_size_id)
  end
end
