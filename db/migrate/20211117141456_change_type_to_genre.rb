class ChangeTypeToGenre < ActiveRecord::Migration[6.1]
  def change
    rename_column :outings, :type, :genre
  end
end
