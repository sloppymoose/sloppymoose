import { BadgesTabScreen } from '../Screens';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { connect } from 'react-redux/native';

function getState() {
  return {};
}

class BadgesTabContainer extends Component {
  render() {
    return (
      <BadgesTabScreen/>
    );
  }
}

BadgesTabContainer.propTypes = {
  tabVisible: PropTypes.bool
};

BadgesTabContainer.defaultProps = {
  tabVisible: false
};

export const BadgesTabHandler = connect(getState)(BadgesTabContainer);
