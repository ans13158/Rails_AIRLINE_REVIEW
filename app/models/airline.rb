# model for airlines
class Airline < ApplicationRecord
  has_many :reviews, dependent: false
  before_create :generate_slug

  enum status: { inactive: 0, active: 1 }
  enum deletion_status: { deleted: 0, not_deleted: 1 }

  def generate_slug
    self.slug = name.parameterize
  end
end
