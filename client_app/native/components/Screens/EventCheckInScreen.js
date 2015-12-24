import { Actions } from 'react-native-redux-router';
import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
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

export class EventCheckInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { allowCheckIn: false, inRegion: false };
  }
  componentWillUpdate(nextProps, nextState) {
    const accuracy = nextProps.beacons.getIn(['nearest','accuracy']);
    nextState.inRegion = !!accuracy;
    if(!accuracy) {
      nextState.allowCheckIn = false;
    } else if(accuracy < 1.5) {
      nextState.allowCheckIn = true;
    } else if(accuracy > 2) {
      nextState.allowCheckIn = false;
    }
  }
  render() {
    const beacon = this.props.beacons.get('nearest');
    let checkInAction;
    if(!this.state.inRegion) {
      checkInAction = <Text>Find Moose!</Text>;
    } else if(this.state.allowCheckIn) {
      checkInAction = <EventCheckInButton beacon={beacon}/>;
    } else {
      checkInAction = <Text>Get closer to Moose!</Text>;
    }
    return (
      <View style={baseStyles.root}>
        <Text>Event Check In</Text>
        <Text>{beacon.get('proximity')}</Text>
        <Text>{beacon.get('accuracy')}</Text>
        <Text>{JSON.stringify(this.state)}</Text>
        {checkInAction}
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
  beacons: ImmutablePropTypes.contains({
    accuracy: PropTypes.number,
    nearest: ImmutablePropTypes.map,
    proximity: PropTypes.string
  })
};
EventCheckInScreen.defaultProps = {
  beacons: Immutable.Map()
};
