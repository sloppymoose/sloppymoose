class EnablePostgressExtensions < ActiveRecord::Migration
  def up
    # Enable Trigrams, etc.
    #
    # See also:
    #   http://www.postgresql.org/docs/9.1/static/pgtrgm.html
    execute 'CREATE EXTENSION pg_trgm;'

    # Enable soundex, difference, Levenshtein, etc.
    #
    # See also:
    #   http://www.postgresql.org/docs/9.1/static/fuzzystrmatch.html
    execute 'CREATE EXTENSION fuzzystrmatch;'
  end

  def down
    execute 'DROP EXTENSION pg_trgm;'
    execute 'DROP EXTENSION fuzzystrmatch;'
  end
end
