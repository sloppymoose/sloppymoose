import {
  Component,
  DeviceEventEmitter,
  Navigator,
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Dimensions from 'Dimensions';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { SignUpForm } from '../Forms';

const NavbarHeight = 20 + Navigator.NavigationBar.Styles.General.NavBarHeight;
const baseStyles = StyleSheet.create({
  content: {
    flex: 1
  },
  footer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  link: {
    fontWeight: 'bold'
  },
  root: {
    flex: 1
  },
  screen: {
    flex: 1,
    marginTop: NavbarHeight
  },
  scrollView: {
    flex: 1
  }
});

export class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
    this.handleKeyboardWillHide = this.handleKeyboardWillHide.bind(this);
    this.handleKeyboardWillShow = this.handleKeyboardWillShow.bind(this);
    this.handleRootPress = this.handleRootPress.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.state = {
      keyboardHeight: 0,
      keyboardVisible: false
    };
  }
  componentWillMount() {
    this._listeners = [
      DeviceEventEmitter.addListener('keyboardWillHide', this.handleKeyboardWillHide),
      DeviceEventEmitter.addListener('keyboardWillShow', this.handleKeyboardWillShow)
    ];
  }
  componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove());
  }
  handleBack() {
    this.props.onBackPress();
  }
  handleKeyboardWillHide() {
    this.setState({
      keyboardHeight: 0,
      keyboardVisible: false
    });
  }
  handleKeyboardWillShow(e) {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      keyboardVisible: true
    });
  }
  handleRootPress() {
    dismissKeyboard();
  }
  handleSignIn() {
    this.props.onSignInPress();
  }
  render() {
    const { height } = Dimensions.get('window');
    const reactiveRootStyles = {
      height: height - NavbarHeight
    };
    return (
      <View style={baseStyles.screen}>
        <ScrollView
          keyboardShouldPersistTaps
          ref="scrollView"
          scrollEnabled={false}
          style={baseStyles.scrollView}
        >
          <TouchableWithoutFeedback onPress={this.handleRootPress}>
            <View style={reactiveRootStyles}>
              <View style={baseStyles.content}>
                <SignUpForm
                  keyboardVisible={this.state.keyboardVisible}
                  shirtSizes={this.props.shirtSizes}
                  signUpUser={this.props.signUpUser}
                  spacerHeight={this.state.keyboardHeight}
                  user={this.props.user}
                />
                <View style={baseStyles.footer}>
                  <Text>
                    Already have an
                    account? <Text onPress={this.handleSignIn} style={baseStyles.link}>
                      Sign In.
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    );
  }
}

SignUpScreen.propTypes = {
  onBackPress: PropTypes.func,
  onSignInPress: PropTypes.func,
  shirtSizes: ImmutablePropTypes.map,
  signUpUser: PropTypes.func,
  user: PropTypes.any
};
SignUpScreen.defaultProps = {
  onBackPress: emptyFn,
  onSignInPress: emptyFn,
  shirtSizes: Immutable.Map()
};
