import { Actions } from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { Component, PropTypes, Text, TouchableOpacity, View } from 'react-native';
import { checkInToEvent } from '../../../react/actions/CheckInActions';
import { connect } from 'react-redux/native';
import emptyFn from 'empty/function';
import emptyObj from 'empty/object';

function getState() {
  return emptyObj;
}

function getActions(dispatch) {
  return bindActionCreators({ checkInToEvent }, dispatch);
}

export class EventCheckInAction extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.checkInToEvent()
      .then(() => Actions.home());
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View>
          <Text>
            Check In to Event!
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

EventCheckInAction.propTypes = {
  checkInToEvent: PropTypes.func
};
EventCheckInAction.defaultProps = {
  checkInToEvent: emptyFn
};

export const EventCheckInButton = connect(getState, getActions)(EventCheckInAction);
