import { Component, PropTypes, Text, TouchableOpacity, View } from 'react-native';
import emptyFn from 'empty/function';

export class SignOutButton extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.props.signOutUser();
  }
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <View>
          <Text>
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SignOutButton.propTypes = {
  signOutUser: PropTypes.func
};
SignOutButton.defaultProps = {
  signOutUser: emptyFn
};
