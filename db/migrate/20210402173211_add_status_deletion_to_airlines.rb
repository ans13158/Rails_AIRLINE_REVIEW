# add cols to airlines tbl
class AddStatusDeletionToAirlines < ActiveRecord::Migration[6.0]
  def change
    add_column :airlines, :status, :integer, null: false, default: 1
    add_column :airlines, :deletion_status, :integer, null: false, default: 1
  end
end
