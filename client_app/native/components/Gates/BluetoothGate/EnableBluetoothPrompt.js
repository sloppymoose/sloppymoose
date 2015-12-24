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

export class EnableBluetoothPrompt extends Component {
  constructor(props) {
    super(props);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickEnable = this.handleClickEnable.bind(this);
  }
  handleClickCancel() {
    this.props.onCancel();
  }
  handleClickEnable() {
    this.props.requestBluetoothAccess();
  }
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>BT Gate</Text>
        <Text>{this.props.beacons.get('authorizationState')}</Text>
        <Text>{this.props.beacons.get('enabled').toString()}</Text>
        <Text>Bluetooth is required</Text>
        <TouchableOpacity onPress={this.handleClickEnable}>
          <View>
            <Text>
              Enable Bluetooth Access
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handleClickCancel}>
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

EnableBluetoothPrompt.propTypes = {
  beacons: ImmutablePropTypes.contains({
    enabled: PropTypes.bool
  }),
  onCancel: PropTypes.func,
  requestBluetoothAccess: PropTypes.func
};
EnableBluetoothPrompt.defaultProps = {
  beacons: Immutable.Map(),
  onCancel: emptyFn,
  requestBluetoothAccess: emptyFn
};
