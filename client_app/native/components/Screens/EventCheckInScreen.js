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
  render() {
    const beacon = this.props.beacons.get('nearest');
    return (
      <View style={baseStyles.root}>
        <Text>Event Check In</Text>
        <Text>{beacon.get('proximity')}</Text>
        <Text>{beacon.get('accuracy')}</Text>
        <TouchableOpacity onPress={this.props.onSignUpPress}>
          <View>
            <Text>
              Check In!
            </Text>
          </View>
        </TouchableOpacity>
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
