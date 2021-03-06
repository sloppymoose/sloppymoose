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

ActiveRecord::Schema.define(version: 20160503051159) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "pg_trgm"
  enable_extension "fuzzystrmatch"

  create_table "badges_sashes", force: :cascade do |t|
    t.integer  "badge_id"
    t.integer  "sash_id"
    t.boolean  "notified_user", default: false
    t.datetime "created_at"
  end

  add_index "badges_sashes", ["badge_id", "sash_id"], name: "index_badges_sashes_on_badge_id_and_sash_id", using: :btree
  add_index "badges_sashes", ["badge_id"], name: "index_badges_sashes_on_badge_id", using: :btree
  add_index "badges_sashes", ["sash_id"], name: "index_badges_sashes_on_sash_id", using: :btree

  create_table "beacons", force: :cascade do |t|
    t.string   "name",                                  null: false
    t.string   "identifier",                            null: false
    t.string   "uuid",       limit: 36,                 null: false
    t.integer  "major",                 default: 1,     null: false
    t.integer  "minor",                 default: 1,     null: false
    t.boolean  "default",               default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "check_ins", force: :cascade do |t|
    t.integer  "user_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.integer  "event_id"
    t.integer  "beacon_id",                            null: false
    t.decimal  "accuracy",                             null: false
    t.string   "proximity",                            null: false
    t.integer  "rssi",                                 null: false
    t.boolean  "legacy",               default: false, null: false
    t.integer  "legacy_sheet_user_id"
  end

  add_index "check_ins", ["event_id"], name: "index_check_ins_on_event_id", using: :btree
  add_index "check_ins", ["user_id", "event_id"], name: "index_check_ins_on_user_id_and_event_id", unique: true, using: :btree

  create_table "event_beacons", force: :cascade do |t|
    t.integer  "beacon_id",  null: false
    t.integer  "event_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "event_beacons", ["beacon_id"], name: "index_event_beacons_on_beacon_id", using: :btree
  add_index "event_beacons", ["event_id"], name: "index_event_beacons_on_event_id", using: :btree

  create_table "events", force: :cascade do |t|
    t.string   "name",                         null: false
    t.boolean  "public",       default: true,  null: false
    t.boolean  "auto_created", default: false, null: false
    t.datetime "starts_at",                    null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

  create_table "legacy_sheet_users", force: :cascade do |t|
    t.string   "name",                            null: false
    t.integer  "legacy_sign_ins", default: 0
    t.integer  "shirt_size_id"
    t.boolean  "shirt_awarded",   default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "legacy_sheet_users", ["name", "shirt_size_id"], name: "index_legacy_sheet_users_on_name_and_shirt_size_id", unique: true, using: :btree

  create_table "merit_actions", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "action_method"
    t.integer  "action_value"
    t.boolean  "had_errors",    default: false
    t.string   "target_model"
    t.integer  "target_id"
    t.text     "target_data"
    t.boolean  "processed",     default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "merit_activity_logs", force: :cascade do |t|
    t.integer  "action_id"
    t.string   "related_change_type"
    t.integer  "related_change_id"
    t.string   "description"
    t.datetime "created_at"
  end

  create_table "merit_score_points", force: :cascade do |t|
    t.integer  "score_id"
    t.integer  "num_points", default: 0
    t.string   "log"
    t.datetime "created_at"
  end

  create_table "merit_scores", force: :cascade do |t|
    t.integer "sash_id"
    t.string  "category", default: "default"
  end

  create_table "oauth_access_grants", force: :cascade do |t|
    t.integer  "resource_owner_id", null: false
    t.integer  "application_id",    null: false
    t.string   "token",             null: false
    t.integer  "expires_in",        null: false
    t.text     "redirect_uri",      null: false
    t.datetime "created_at",        null: false
    t.datetime "revoked_at"
    t.string   "scopes"
  end

  add_index "oauth_access_grants", ["token"], name: "index_oauth_access_grants_on_token", unique: true, using: :btree

  create_table "oauth_access_tokens", force: :cascade do |t|
    t.integer  "resource_owner_id"
    t.integer  "application_id"
    t.string   "token",             null: false
    t.string   "refresh_token"
    t.integer  "expires_in"
    t.datetime "revoked_at"
    t.datetime "created_at",        null: false
    t.string   "scopes"
  end

  add_index "oauth_access_tokens", ["refresh_token"], name: "index_oauth_access_tokens_on_refresh_token", unique: true, using: :btree
  add_index "oauth_access_tokens", ["resource_owner_id"], name: "index_oauth_access_tokens_on_resource_owner_id", using: :btree
  add_index "oauth_access_tokens", ["token"], name: "index_oauth_access_tokens_on_token", unique: true, using: :btree

  create_table "oauth_applications", force: :cascade do |t|
    t.string   "name",                      null: false
    t.string   "uid",                       null: false
    t.string   "secret",                    null: false
    t.text     "redirect_uri",              null: false
    t.string   "scopes",       default: "", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "oauth_applications", ["uid"], name: "index_oauth_applications_on_uid", unique: true, using: :btree

  create_table "sashes", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "shirt_sizes", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "shirt_sizes", ["name"], name: "index_shirt_sizes_on_name", unique: true, using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                            default: "",    null: false
    t.string   "name"
    t.string   "password"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "encrypted_password",               default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                    default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.boolean  "admin",                            default: false, null: false
    t.string   "safety_waiver_accepted", limit: 1, default: "0",   null: false
    t.integer  "shirt_size_id",                                    null: false
    t.boolean  "first_timer",                      default: false, null: false
    t.integer  "legacy_sheet_user_id"
    t.integer  "sash_id"
    t.integer  "level",                            default: 0
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
