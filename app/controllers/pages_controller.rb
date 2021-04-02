# pages controller
class PagesController < ApplicationController
  def index
    render json: { message: 'You shall not pass' }, status: :not_found
  end
end
