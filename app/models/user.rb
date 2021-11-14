class User < ApplicationRecord
  has_many :couples
  has_many :spots
  has_many :outing_reviews
end
