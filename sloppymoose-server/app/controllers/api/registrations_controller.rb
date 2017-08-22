# This is a stripped down copy of Devise::RegistrationsController
# It is designed to provide just enough functionality to work as an API end-point
class Api::RegistrationsController < ApiController
  include DeviseControllerHelpers

  helper DeviseHelper

  helpers = %w(resource scope_name resource_name signed_in_resource
               resource_class resource_params devise_mapping)
  helper_method(*helpers)

  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up #if is_flashing_format?
        respond_with resource, meta: { flash: flash.now[:notice] }, location: nil
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" #if is_flashing_format?
        # expire_data_after_sign_in!
        respond_with resource, meta: { flash: flash.now[:notice] }, location: nil #after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  protected

  # Build a devise resource passing in the session. Useful to move
  # temporary session data to the newly created user.
  def build_resource(hash=nil)
    self.resource = resource_class.new_with_session(hash || {}, session)
  end

  def sign_up_params
    devise_parameter_sanitizer.sanitize(:sign_up)
  end
end
