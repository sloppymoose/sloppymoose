# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

if Rails.env.development?
  User.where(id: 1).first_or_create!(
    admin: true,
    name: 'Derek Lindahl',
    email: 'derek.lindahl@gmail.com',
    password: 'test password',
    password_confirmation: 'test password',

    # Confirmable
    confirmed_at: Time.now.utc
  )

  User.where(id: 2).first_or_create!(
    admin: false,
    name: 'Nick Faragasso',
    email: 'nick@example.org',
    password: 'password password password',
    password_confirmation: 'password password password',

    # Confirmable
    unconfirmed_email: 'nick@example.org'
  )
end
