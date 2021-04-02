class CreateAirlines < ActiveRecord::Migration[6.0]
  def change
    create_table :airlines do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :image_url, null: false
      t.integer :review_count, null: false, default: 0
      t.float :avg_review, null: false, default: 0.0
      t.timestamps

      t.index :slug, unique: true
      t.index :name, unique: false
    end
  end
end
