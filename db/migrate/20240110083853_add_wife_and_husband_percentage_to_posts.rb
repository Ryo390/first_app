class AddWifeAndHusbandPercentageToPosts < ActiveRecord::Migration[7.0]
  def change
    add_column :posts, :wife_percentage, :integer
    add_column :posts, :husband_percentage, :integer
  end
end
