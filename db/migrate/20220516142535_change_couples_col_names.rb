class ChangeCouplesColNames < ActiveRecord::Migration[6.1]
  def change
    rename_column :couples, :user_1_id, :user1_id
    rename_column :couples, :user_2_id, :user2_id
  end
end
