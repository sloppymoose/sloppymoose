# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Pseudo-beacon for Legacy Check-In processing
Beacon.where(name: Beacon::LegacyPseudoBeaconName).first_or_create!(
  default: false,
  identifier: 'SM Networks',
  uuid: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
)

if ENV['DEFAULT_BEACON_UUID']
  Beacon.create_with(
    default: true,
    name: 'Default Moose Beacon',
    identifier: 'Radius Networks',
  ).first_or_create!(
    uuid: ENV['DEFAULT_BEACON_UUID']
  )
end

if Rails.env.development?
  User.create_with(
    confirmed_at: Time.now,
    password: 'password1234',
    shirt_size_id: 10
  ).first_or_create!(
    admin: true,
    email: 'derek.lindahl@gmail.com',
    name: 'Derek Lindahl'
  )
end
