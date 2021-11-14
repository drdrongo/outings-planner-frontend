class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :f_name
      t.string :l_name
      t.string :email
      t.string :password
      t.string :image
      t.date   :birthday

      t.timestamps
    end
  end
end
