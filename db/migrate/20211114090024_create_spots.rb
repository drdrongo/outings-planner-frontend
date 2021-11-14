class CreateSpots < ActiveRecord::Migration[6.1]
  def change
    create_table :spots do |t|
      t.integer :price
      t.integer :mood
      t.string :title
      t.string :location
      t.integer :type
      t.string :images
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
