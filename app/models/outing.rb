class Outing < ApplicationRecord
  belongs_to :couple
  # belongs_to :spot
  has_many :outing_reviews

  def self.genres
    %w[Active Chill Culture Food Nature Party Social Stay-in]
  end

  # def self.search(search)
  #   if search


  #     # genre = "genre = #{search.genre}"
  #     # [
  #     #   *(str1 unless str1.empty?), str2
  #     # ]

  #     args = []
  #     conditions = []

  #     # # Equal or greater?
  #     # t.integer "rating", default: 0, null: false

  #     # # Equal
  #     # t.integer "mood", default: 0, null: false
  #     # t.integer "price", default: 0, null: false
  #     # t.boolean "is_complete", default: false
  #     # t.boolean "is_favorite", default: false

  #     # t.string "genre", default: "", null: false

  #     # # Like
  #     # t.string "title", default: "", null: false


  #     # search.each do | key, val |
  #     #   # Equals
  #     #   if ['genre', 'mood', 'price', 'is_complete', 'is_favorite'].include? key
  #     #     conditions.push("#{key} = '#{val}'")
  #     #     # args.push(val)
  #     #   end
  #     #   # Like

  #     # end

  #     find(:all, conditions: [
  #     ])
  #   else
  #     find(:all)
  #   end
  # end
  
end
