class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :title
      t.string :review_text
      t.integer :score

      t.belongs_to :airlines, foreign_key: true
      t.timestamps
    end
  end
end
