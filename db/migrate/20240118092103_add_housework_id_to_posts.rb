class AddHouseworkIdToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :housework_id, :integer
  end
end
