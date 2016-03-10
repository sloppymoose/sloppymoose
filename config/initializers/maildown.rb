module Maildown
  module MarkdownEngine
    # Freedom patch the default Markdown renderer
    #
    # The default renderer configuration API only provides a per-thread
    # configuration change. We want to _always_ use this custom configuration
    # so we've freedom-patched the module to hardcode the config change.
    #
    # See also:
    #   https://github.com/schneems/maildown#configure-markdown-renderer
    def self.default
      require 'kramdown' unless defined? Kramdown
      ->(string) { Kramdown::Document.new(string, input: 'GFM').to_html }
    end
  end
end
