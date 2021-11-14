class Outing < ApplicationRecord
  belongs_to :couple
  belongs_to :spot
  has_many :outing_reviews
end
