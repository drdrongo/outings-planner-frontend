class CreateOutings < ActiveRecord::Migration[6.1]
  def change
    create_table :outings do |t|
      t.references :couple, null: false, foreign_key: true
      t.references :spot, null: false, foreign_key: true
      t.integer :rating
      t.datetime :attend_on
      t.string :images
      t.boolean :is_complete
      t.boolean :is_favorite

      t.timestamps
    end
  end
end
