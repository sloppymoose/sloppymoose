desc "Rebuilds Merit badges, points, etc."
task rebuild_merit: :environment do
  MeritRebuilder.new.perform
end
