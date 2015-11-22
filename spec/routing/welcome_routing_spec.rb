require 'spec_helper'

describe 'welcome routing' do
  it 'routes GET / to /welcome#index' do
    expect(get: '/').to route_to(controller: 'welcome', action: 'index')
  end
end
