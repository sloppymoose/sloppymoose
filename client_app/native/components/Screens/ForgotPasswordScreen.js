import {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import NavigationBar from 'react-native-navbar';

const baseStyles = StyleSheet.create({
  root: {
    backgroundColor: '#262664',
    flex: 1
  }
});
const NavTitle = {
  title: 'Sign Up'
};

export class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }
  handleBack() {
    this.props.onBackPress();
  }
  render() {
    const leftNavButton = {
      title: 'Back',
      handler: this.handleBack
    };
    return (
      <View style={baseStyles.root}>
        <NavigationBar
          leftButton={leftNavButton}
          title={NavTitle}
        />
        <Text>TODO</Text>
      </View>
    );
  }
}

ForgotPasswordScreen.propTypes = {
  onBackPress: PropTypes.func
};
ForgotPasswordScreen.defaultProps = {
  onBackPress: emptyFn
};
