import {
  Component,
  PropTypes,
  StyleSheet,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { InRangeEvents } from './InRangeEvents';
import { NoInRangeEvents } from './NoInRangeEvents';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 64
  }
});

export class EventCheckInTabScreen extends Component {
  componentDidMount() {
    if(this.props.tabVisible && this.props.beacons.get('enabled')) {
      this.props.fetchActiveEvents();
    }
  }
  componentDidUpdate(prevProps) {
    const wasVisible = prevProps.tabVisible;
    const nowVisible = this.props.tabVisible;
    const wasEnabled = prevProps.beacons.get('enabled');
    const nowEnabled = this.props.beacons.get('enabled');
    const prevActiveEventBeacons = prevProps.beacons.get('activeEventBeacons');
    const activeEventBeacons = this.props.beacons.get('activeEventBeacons');

    if((!wasVisible && nowVisible && nowEnabled) || (!wasEnabled && nowEnabled)) {
      this.props.startMonitoring(activeEventBeacons);
      this.props.fetchActiveEvents();
    } else if((wasVisible && !nowVisible) || (wasEnabled && !nowEnabled)) {
      this.props.stopMonitoring(activeEventBeacons);
    } else if(nowEnabled && prevActiveEventBeacons !== activeEventBeacons) {
      this.props.stopMonitoring(prevActiveEventBeacons);
      this.props.startMonitoring(activeEventBeacons);
    }
  }
  componentWillUnmount() {
    if(!this.props.tabVisible) {
      this.props.stopMonitoring();
    }
  }
  render() {
    let checkInActions;
    const inRangeEvents = this.props.activeEvents.get('inRange');
    if(inRangeEvents.size > 0) {
      checkInActions = <InRangeEvents events={inRangeEvents}/>;
    } else {
      checkInActions = <NoInRangeEvents/>;
    }
    return (
      <View style={baseStyles.root}>
        {checkInActions}
      </View>
    );
  }
}

EventCheckInTabScreen.propTypes = {
  activeEvents: ImmutablePropTypes.contains({
    inRange: ImmutablePropTypes.list
  }),
  beacons: ImmutablePropTypes.contains({
    activeEventBeacons: ImmutablePropTypes.list,
    nearest: ImmutablePropTypes.map,
    proximity: PropTypes.string
  }),
  fetchActiveEvents: PropTypes.func,
  startMonitoring: PropTypes.func,
  stopMonitoring: PropTypes.func,
  tabVisible: PropTypes.bool
};
EventCheckInTabScreen.defaultProps = {
  activeEvents: Immutable.List(),
  beacons: Immutable.Map(),
  fetchActiveEvents: emptyFn,
  startMonitoring: emptyFn,
  stopMonitoring: emptyFn,
  tabVisible: false
};
