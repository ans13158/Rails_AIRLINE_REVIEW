# Controller for airlines API
module Admin
  module V1
    class AirlinesController < ApiController
      before_action :set_airline

      def index

      end

      private

      def set_airline
        @airline = Airline.find_by(slug: params[:slug])
      end
    end
  end
end
