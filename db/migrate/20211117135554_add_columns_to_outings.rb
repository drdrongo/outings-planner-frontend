class AddColumnsToOutings < ActiveRecord::Migration[6.1]
  def change
    add_column :outings, :title, :string
    add_column :outings, :description, :string
    add_column :outings, :mood, :integer
    add_column :outings, :price, :integer
    add_column :outings, :type, :integer
    change_column :outings, :is_complete, :boolean, default: false
    change_column :outings, :is_favorite, :boolean, default: false
  end
end
