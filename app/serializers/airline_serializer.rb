# serializer for airlines
class AirlineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :slug, :image_url, :status, :review_count, :avg_review

  has_many :reviews, serializer: ReviewSerializer
end
