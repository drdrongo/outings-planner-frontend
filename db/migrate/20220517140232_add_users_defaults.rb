class AddUsersDefaults < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :f_name, :string, default: '', null: false
    change_column :users, :l_name, :string, default: '', null: false
    change_column :users, :image, :string, default: '', null: false
  end
end
