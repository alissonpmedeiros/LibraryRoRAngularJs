# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160821190432) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "street"
    t.string   "city"
    t.integer  "state_id"
    t.string   "zipcode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  create_table "authors", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.text     "bio"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "authors_books", id: false, force: :cascade do |t|
    t.integer "author_id"
    t.integer "book_id"
  end

  create_table "books", force: :cascade do |t|
    t.string   "title"
    t.integer  "isbn"
    t.integer  "quantity"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "category_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string   "category_name"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  create_table "fines", force: :cascade do |t|
    t.float    "value"
    t.integer  "loan_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "loans", force: :cascade do |t|
    t.boolean  "loaned",     default: true
    t.integer  "book_id"
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.integer  "admin_id"
    t.integer  "user_id"
  end

  add_index "loans", ["book_id"], name: "index_loans_on_book_id", using: :btree

  create_table "request_books", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "book_id"
    t.boolean  "request_status", default: true
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  create_table "states", force: :cascade do |t|
    t.string   "name"
    t.string   "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",                  default: false
    t.boolean  "address_registrable",    default: false
    t.integer  "number_loans",           default: 0
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree

  add_foreign_key "loans", "books"
end
