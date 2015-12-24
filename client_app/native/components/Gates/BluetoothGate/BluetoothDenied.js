import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import emptyFn from 'empty/function';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export class BluetoothDenied extends Component {
  constructor(props) {
    super(props);
    this.handlePressCancel = this.handlePressCancel.bind(this);
    this.handlePressTryAgain = this.handlePressTryAgain.bind(this);
  }
  handlePressTryAgain() {
    this.props.onManualChange();
  }
  handlePressCancel() {
    this.props.onCancel();
  }
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>BT is denied!</Text>
        <Text>Please enable via Settings</Text>
        <TouchableOpacity onPress={this.handlePressTryAgain}>
          <View>
            <Text>
              Try Again
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handlePressCancel}>
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

BluetoothDenied.propTypes = {
  onCancel: PropTypes.func,
  onManualChange: PropTypes.func
};
BluetoothDenied.defaultProps = {
  onCancel: emptyFn,
  onManualChange: emptyFn
};
