import { BadgesTabScreen } from '../Screens';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';
import { fetchBadges } from '../../../react/actions/BadgeActions';
import { isTabVisible } from '../../../react/util/navigationHelpers';

function getState(state) {
  return {
    badges: state.badges
  };
}

function getActions(dispatch) {
  return bindActionCreators({ fetchBadges }, dispatch);
}

class BadgesTabContainer extends Component {
  componentWillMount() {
    this.props.fetchBadges();
  }
  render() {
    const tabVisible = isTabVisible(this);
    return (
      <BadgesTabScreen
        badges={this.props.badges}
        fetchBadges={this.props.fetchBadges}
        tabVisible={tabVisible}
      />
    );
  }
}

BadgesTabContainer.propTypes = {
  badges: PropTypes.any,
  fetchBadges: PropTypes.func
};
BadgesTabContainer.routeName = 'badges';

export const BadgesTabHandler = connect(getState, getActions)(BadgesTabContainer);
