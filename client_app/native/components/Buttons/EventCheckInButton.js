import { Actions } from 'react-native-redux-router';
import Button from 'apsl-react-native-button';
import { bindActionCreators } from 'redux';
import { Component, PropTypes } from 'react-native';
import { checkInToEvent } from '../../../react/actions/CheckInActions';
import { connect } from 'react-redux/native';
import emptyFn from 'empty/function';
import emptyObj from 'empty/object';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

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
    .catch((err) => {
      console.error(err);
    });
  }
  render() {
    const name = this.props.event.getIn(['attributes', 'name']);
    return (
      <Button onPress={this.handlePress}>
        {`Check in to ${name}`}
      </Button>
    );
  }
}

EventCheckInAction.propTypes = {
  checkInToEvent: PropTypes.func,
  event: ImmutablePropTypes.contains({
    attributes: ImmutablePropTypes.contains({
      name: PropTypes.string
    }),
    relationships: ImmutablePropTypes.contains({
      beacons: ImmutablePropTypes.contains({
        id: PropTypes.number
      })
    })
  })
};
EventCheckInAction.defaultProps = {
  checkInToEvent: emptyFn,
  event: Immutable.Map()
};

export const EventCheckInButton = connect(getState, getActions)(EventCheckInAction);
