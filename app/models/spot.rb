class Spot < ApplicationRecord
  belongs_to :user
  has_many :outings

  def self.types
    %w[Activity Food Culture Nature Party Social Stay-in]
  end
end
