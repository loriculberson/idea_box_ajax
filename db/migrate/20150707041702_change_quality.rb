class ChangeQuality < ActiveRecord::Migration
  def change
   change_column :ideas, :quality, :integer, default: 0, null: false
  end
end
