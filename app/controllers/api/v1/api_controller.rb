module Api
  module V1
    # base controller for Api::V1 namespaces controllers
    class ApiController < ActionController::API
      rescue_from ActiveRecord::RecordNotFound do |exception|
        Rails.logger.warn exception.message
        Rails.logger.warn exception.backtrace.join('\n')
        render json: { message: 'Resource you are looking for doesn\'t exist' }, status: :not_found
      end
    end
  end
end
