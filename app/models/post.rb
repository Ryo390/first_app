class Post < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions

  validates :wife_percentage, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :husband_percentage, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  validates :housework_id, presence: true, numericality: { other_than: 1, message: "can't be blank" }

  belongs_to :housework
end
