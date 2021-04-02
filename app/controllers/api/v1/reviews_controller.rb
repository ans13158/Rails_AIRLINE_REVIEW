# reviews controller
module Api
  module V1
    # base controller for Api::V1 namespaces controllers
    class ReviewsController < ApiController
      before_action :set_airline, only: %i[index create update]
      before_action :set_review, only: %i[show update]

      def index
        reviews = @airline.reviews
        options = {}
        options[:fields] = {
          review: %i[title review_text score airline_id],
          airline: %i[name slug]
        }
        options[:include] = %i[airline]
        render json: ReviewSerializer.new(reviews, options), status: :ok
      end

      def show
        options = {}
        options[:fields] = {
          review: %i[title review_text score airline_id],
          airline: %i[name slug]
        }
        options[:include] = %i[airline]
        render json: ReviewSerializer.new(@review, options), status: :ok
      end

      def create
        @review = @airline.reviews.create!(permitted_params)
        render json: ReviewSerializer.new(@review, review_show_options), status: :ok
      rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved => e
        log_error(e)
      end

      def update
        @review.update!(permitted_params)
        render json: ReviewSerializer.new(@review, review_show_options), status: :ok
      rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved => e
        log_error(e)
      end

      private

      def review_show_options
        options = {}
        options[:fields] = {
          review: %i[title review_text score airline_id],
          airline: %i[name slug]
        }
        options[:include] = %i[airline]
        options
      end

      def permitted_params
        params.require(:review).permit(:title, :review_text, :score)
      end

      def set_airline
        @airline = Airline.active.not_deleted.find_by!(slug: params[:slug])
      end

      def set_review
        @review = Review.find(params[:id])
      end

      def log_error(exception)
        Rails.logger.warn exception.message
        Rails.logger.warn exception.backtrace.join("\n")
        render json: { message: 'Error creating review', error: exception.message },
               status: :unprocessable_entity
      end
    end
  end
end
