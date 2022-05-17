class AddOutingsDefaults < ActiveRecord::Migration[6.1]
  def change
    change_column :outings, :rating, :integer, default: 0, null: false
    change_column :outings, :mood, :integer, default: 0, null: false
    change_column :outings, :price, :integer, default: 0, null: false
    change_column :outings, :genre, :integer, default: 0, null: false
    change_column :outings, :is_visible, :boolean, default: true, null: false
    change_column :outings, :images, :text, array: true, default: [], null: false
    change_column :outings, :title, :string, default: '', null: false
    change_column :outings, :description, :text, default: '', null: false
  end
end
