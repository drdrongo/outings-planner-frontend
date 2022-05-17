class AddOutingReviewsDefaults < ActiveRecord::Migration[6.1]
  def change
    change_column :outing_reviews, :title, :string, default: '', null: false
    change_column :outing_reviews, :content, :text, default: '', null: false
    change_column :outing_reviews, :is_visible, :boolean, default: true, null: false
  end
end
