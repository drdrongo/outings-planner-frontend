class Outing < ApplicationRecord
  belongs_to :couple
  # belongs_to :spot
  has_many :outing_reviews

  def self.genres
    %w[Active Chill Culture Food Nature Party Social Stay-in]
  end
end
