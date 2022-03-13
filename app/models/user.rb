class User < ApplicationRecord
  has_secure_password validations: false

  has_many :couples
  has_many :spots
  has_many :outing_reviews

  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password,
            length: { minimum: 6 },
            if: -> { new_record? || !password.nil? }
end
