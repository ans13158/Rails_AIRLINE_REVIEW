# serializer for Review model
class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :review_text, :score, :airline_id

  belongs_to :airline
end
