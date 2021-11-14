class CreateOutingReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :outing_reviews do |t|
      t.references :user, null: false, foreign_key: true
      t.references :outing, null: false, foreign_key: true
      t.string :title
      t.string :content
      t.boolean :is_visible

      t.timestamps
    end
  end
end
