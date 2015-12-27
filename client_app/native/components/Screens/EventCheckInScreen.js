import { Actions } from 'react-native-redux-router';
import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import { EventCheckInButton } from '../Buttons';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

function componentize(inRangeEvent, i) {
  return <EventCheckInButton event={inRangeEvent} key={inRangeEvent.get('id')}/>;
}

export class EventCheckInScreen extends Component {
  componentDidMount() {
    if(this.props.beacons.get('enabled')) {
      this.props.fetchActiveEvents();
    }
  }
  componentDidUpdate(prevProps) {
    const wasEnabled = prevProps.beacons.get('enabled');
    const nowEnabled = this.props.beacons.get('enabled');
    const prevActiveEventBeacons = prevProps.beacons.get('activeEventBeacons');
    const activeEventBeacons = this.props.beacons.get('activeEventBeacons');

    if(!wasEnabled && nowEnabled) {
      this.startMonitoring(activeEventBeacons);
      this.props.fetchActiveEvents();
    } else if(wasEnabled && !nowEnabled) {
      this.props.stopMonitoring(activeEventBeacons);
    } else if(nowEnabled && prevActiveEventBeacons !== activeEventBeacons) {
      this.props.stopMonitoring(prevActiveEventBeacons);
      this.props.startMonitoring(activeEventBeacons);
    }
  }
  componentWillUnmount() {
    this.props.stopMonitoring();
  }
  render() {
    let checkInActions;
    const inRangeEvents = this.props.activeEvents.get('inRange');
    if(inRangeEvents.size > 0) {
      checkInActions = inRangeEvents.map(componentize);
    } else {
      checkInActions = <Text>Find Moose!</Text>;
    }
    const beacon = this.props.beacons.get('nearest');
    return (
      <View style={baseStyles.root}>
        <Text>Event Check In</Text>
        <Text>{beacon.get('proximity')}</Text>
        <Text>{beacon.get('accuracy')}</Text>
        {checkInActions}
        <TouchableOpacity onPress={Actions.home}>
          <View>
            <Text>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

EventCheckInScreen.propTypes = {
  activeEvents: ImmutablePropTypes.contains({
    inRange: ImmutablePropTypes.list,
    items: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({

      })
    )
  }),
  beacons: ImmutablePropTypes.contains({
    accuracy: PropTypes.number,
    activeEventBeacons: ImmutablePropTypes.listOf(
      ImmutablePropTypes.contains({
        identifier: PropTypes.string,
        uuid: PropTypes.string,
        major: PropTypes.number,
        minor: PropTypes.number
      })
    ),
    nearest: ImmutablePropTypes.map,
    proximity: PropTypes.string
  }),
  fetchActiveEvents: PropTypes.func,
  startMonitoring: PropTypes.func,
  stopMonitoring: PropTypes.func,
};
EventCheckInScreen.defaultProps = {
  activeEvents: Immutable.List(),
  beacons: Immutable.Map(),
  fetchActiveEvents: emptyFn,
  startMonitoring: emptyFn,
  stopMonitoring: emptyFn
};
