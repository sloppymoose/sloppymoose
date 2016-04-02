class LinkedLegacyAccountsController < ApplicationController
  def create
    return render 'already_linked' if current_user.legacy_link?
    return render 'invalid_legacy_sheet_user' if legacy_sheet_user.nil?
    LinkLegacyUserToUser.perform(current_user.id, legacy_sheet_user.id)
  end

  private

  def legacy_sheet_user
    @legacy_sheet_user ||= begin
      LegacySheetUser.
        select(:id).
        find_best_user_match(current_user).
        where(id: params[:id]).
        to_a.
        first
    end
  end
end
