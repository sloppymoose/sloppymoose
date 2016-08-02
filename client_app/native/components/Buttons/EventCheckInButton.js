import { Actions } from 'react-native-router-flux';
import Button from 'apsl-react-native-button';
import { bindActionCreators } from 'redux';
import { checkInToEvent } from '../../../react/actions/CheckInActions';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import emptyFn from 'empty/function';
import emptyObj from 'empty/object';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'blue',
    borderWidth: 0
  },
  buttonLabel: {
    color: 'white'
  }
});

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
    const beacon = this.props.event.getIn(['relationships', 'beacons', 'data', '0']);
    const eventId = this.props.event.get('id');
    this.props.checkInToEvent({
      /* eslint-disable camelcase */
      accuracy: beacon.get('accuracy'),
      beacon_id: beacon.get('id'),
      event_id: eventId,
      proximity: beacon.get('proximity'),
      rssi: beacon.get('rssi')
      /* eslint-enable camelcase */
    })
    .then(() => Actions.home())
    .catch(console.error);
  }
  render() {
    return (
      <Button
        onPress={this.handlePress}
        style={baseStyles.button}
        textStyle={baseStyles.buttonLabel}
      >
        Check In
      </Button>
    );
  }
}

EventCheckInAction.propTypes = {
  checkInToEvent: PropTypes.func,
  event: ImmutablePropTypes.contains({
    relationships: ImmutablePropTypes.contains({
      beacons: ImmutablePropTypes.contains({
        data: ImmutablePropTypes.listOf(
          ImmutablePropTypes.contains({
            accuracy: PropTypes.number,
            id: PropTypes.number,
            proximity: PropTypes.string,
            rssi: PropTypes.number
          })
        )
      })
    })
  })
};
EventCheckInAction.defaultProps = {
  checkInToEvent: emptyFn,
  event: Immutable.Map()
};

export const EventCheckInButton = connect(getState, getActions)(EventCheckInAction);
