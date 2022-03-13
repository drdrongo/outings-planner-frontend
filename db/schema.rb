# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_13_125700) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "couples", force: :cascade do |t|
    t.integer "user_1_id"
    t.integer "user_2_id"
    t.integer "total_outings"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "outing_reviews", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "outing_id", null: false
    t.string "title"
    t.string "content"
    t.boolean "is_visible"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["outing_id"], name: "index_outing_reviews_on_outing_id"
    t.index ["user_id"], name: "index_outing_reviews_on_user_id"
  end

  create_table "outings", force: :cascade do |t|
    t.bigint "couple_id", null: false
    t.integer "spot_id"
    t.integer "rating"
    t.datetime "attend_on"
    t.string "images"
    t.boolean "is_complete", default: false
    t.boolean "is_favorite", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "title"
    t.string "description"
    t.integer "mood"
    t.integer "price"
    t.integer "genre"
    t.index ["couple_id"], name: "index_outings_on_couple_id"
    t.index ["spot_id"], name: "index_outings_on_spot_id"
  end

  create_table "spots", force: :cascade do |t|
    t.integer "price"
    t.integer "mood"
    t.string "title"
    t.string "location"
    t.integer "type"
    t.string "images"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_spots_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "f_name"
    t.string "l_name"
    t.string "email"
    t.string "password_digest"
    t.string "image"
    t.date "birthday"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "outing_reviews", "outings"
  add_foreign_key "outing_reviews", "users"
  add_foreign_key "outings", "couples"
  add_foreign_key "outings", "spots"
  add_foreign_key "spots", "users"
end
