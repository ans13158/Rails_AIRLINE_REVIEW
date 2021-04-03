module Api
  module V1
    # Controller for airlines API
    class AirlinesController < ApiController
      before_action :set_airline, except: %i[index]

      def index
        airlines = Airline.active.not_deleted
        options = {}
        options[:include] = %i[reviews]
        options[:fields] = {
          airline: %i[name slug avg_review review_count image_url reviews],
          review: %i[title review_text score]
        }
        render json: AirlineSerializer.new(airlines, options), status: :ok
      end

      def show
        options = {}
        options[:include] = %i[reviews]
        options[:fields] = {
          airline: %i[name slug avg_review review_count image_url],
          review: %i[title review_text score]
        }
        render json: AirlineSerializer.new(@airline, options), status: :ok
      end

      private

      def set_airline
        @airline = Airline.active.not_deleted.find_by!('slug' => params[:slug])
      end
    end
  end
end
