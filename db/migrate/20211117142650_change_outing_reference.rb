class ChangeOutingReference < ActiveRecord::Migration[6.1]
  def change
    change_column :outings, :spot_id, :integer, null: true
  end
end
