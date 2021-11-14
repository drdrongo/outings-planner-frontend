class Spot < ApplicationRecord
  belongs_to :user
  has_many :outings
end
