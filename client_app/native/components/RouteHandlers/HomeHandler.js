import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { fetchCheckIns } from '../../../react/actions/CheckInActions';
import { signOutUser } from '../../../react/actions/UserActions';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
  ActivityTabHandler,
  BadgesTabHandler,
  EventCheckInTabHandler
} from '../TabHandlers';

// TODO: https://github.com/brentvatne/react-native-scrollable-tab-view/pull/118
ScrollableTabView.prototype.componentWillReceiveProps = function(props) {
  if(props.initialPage && props.initialPage !== this.state.currentPage) {
    this.goToPage(props.initialPage);
  }
};

function getState(state) {
  return {
    checkIns: state.checkIns,
    user: state.user
  };
}

function getActions(dispatch) {
  return bindActionCreators({ fetchCheckIns, signOutUser }, dispatch);
}

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.state = { activeTabIndex: 0 };
  }
  componentWillMount() {
    this.props.fetchCheckIns();
  }
  componentWillUpdate(nextProps, nextState) {
    if(nextProps.activeTabIndex >= 0) {
      nextState.activeTabIndex = nextProps.activeTabIndex;
    }
  }
  handleChangeTab(tabState) {
    this.setState({ activeTabIndex: tabState.i });
  }
  render() {
    return (
      <ScrollableTabView
        initialPage={this.state.activeTabIndex}
        onChangeTab={this.handleChangeTab}
        ref="tabs"
        tabBarPosition="bottom"
      >
        <ActivityTabHandler
          tabLabel="Activity"
          tabVisible={this.state.activeTabIndex === 0}
        />
        <EventCheckInTabHandler
          tabLabel="Check In"
          tabVisible={this.state.activeTabIndex === 1}
        />
        <BadgesTabHandler
          tabLabel="Badges"
          tabVisible={this.state.activeTabIndex === 2}
        />
      </ScrollableTabView>
    );
  }
}

HomeContainer.propTypes = {
  checkIns: PropTypes.any,
  fetchCheckIns: PropTypes.func,
  signOutUser: PropTypes.func
};

export const HomeHandler = connect(getState, getActions)(HomeContainer);
