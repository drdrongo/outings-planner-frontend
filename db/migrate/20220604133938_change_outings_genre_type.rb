class ChangeOutingsGenreType < ActiveRecord::Migration[6.1]
  def change
    change_column :outings, :genre, :string, default: '', null: false
  end
end
