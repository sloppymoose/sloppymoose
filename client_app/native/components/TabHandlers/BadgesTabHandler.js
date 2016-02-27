import { BadgesTabScreen } from '../Screens';
import { Component } from 'react-native';
import { connect } from 'react-redux/native';
import { isTabVisible } from '../../../react/util/navigationHelpers';

function getState() {
  return {};
}

class BadgesTabContainer extends Component {
  render() {
    const tabVisible = isTabVisible(this);
    return (
      <BadgesTabScreen tabVisible={tabVisible}/>
    );
  }
}
BadgesTabContainer.routeName = 'badges';

export const BadgesTabHandler = connect(getState)(BadgesTabContainer);
