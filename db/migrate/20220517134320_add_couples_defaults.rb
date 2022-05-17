class AddCouplesDefaults < ActiveRecord::Migration[6.1]
  def change
    change_column :couples, :total_outings, :integer, default: 0, null: false
  end
end
