class AddSpotsDefaults < ActiveRecord::Migration[6.1]
  def change
    change_column :spots, :mood, :integer, default: 0, null: false
    change_column :spots, :price, :integer, default: 0, null: false
    change_column :spots, :type, :integer, default: 0, null: false
    change_column :spots, :genre, :integer, default: 0, null: false
    change_column :spots, :images, :text, array: true, default: [], null: false
    change_column :users, :location, :string, default: '', null: false
  end
end
