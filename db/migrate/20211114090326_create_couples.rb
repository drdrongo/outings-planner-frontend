class CreateCouples < ActiveRecord::Migration[6.1]
  def change
    create_table :couples do |t|
      t.integer :user_1_id
      t.integer :user_2_id
      t.integer :total_outings

      t.timestamps
    end
  end
end
