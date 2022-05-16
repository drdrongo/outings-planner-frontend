class Couple < ApplicationRecord
  has_many :outings
  belongs_to :user1, class_name: 'User'
  belongs_to :user2, class_name: 'User'
end
