# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



# User.create(
#   f_name: 'Hayato',
#   l_name: 'Clarke',
#   email: 'hayatoclarke@gmail.com',
#   password: 'Yoshi123',
#   image: 'https://res.cloudinary.com/hayatocloud/image/upload/v1636882885/hayato-moustache_havo8m.jpg',
#   birthday: Date.new(1993, 11, 19)
# )
# User.create(
#   f_name: 'Erica',
#   l_name: 'Frumson',
#   email: 'trippy-ricky@hotmail.com',
#   password: 'secret',
#   image: 'https://pkimgcdn.peekyou.com/0b67f79311d0199179159a4ec80827b9.jpeg',
#   birthday: Date.new(1999, 1, 1)
# )

# u1 = User.find(1)
# u2 = User.find(2)

# couple = Couple.new(
#   user_1_id: u1.id,
#   user_2_id: u2.id,
#   total_outings: 0
# )
# couple.save!


couple = Couple.find(1)

Outing.delete_all

10.times do
  outing = Outing.new(
    couple_id: couple.id,
    is_complete: false,
    is_favorite: false,
    title: Faker::Hobby.activity,
    description: Faker::Lorem.sentences.join(' '),
    price: rand(1..5),
    mood: rand(1..5),
    genre: rand(1..10),
    rating: rand(1..5),
  )
  outing.save
end
