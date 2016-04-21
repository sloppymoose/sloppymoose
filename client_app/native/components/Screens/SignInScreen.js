import Button from 'apsl-react-native-button';
import {
  Component,
  DeviceEventEmitter,
  Image,
  PropTypes,
  ScrollView,
  StatusBarIOS,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Dimensions from 'Dimensions';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import emptyFn from 'empty/function';
import { SignInForm } from '../Forms';

const baseStyles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  content: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'flex-end'
  },
  hero: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  heroTitle: {
    alignItems: 'center',
    flex: 1
  },
  heroTitleHeading: {
    fontSize: 24
  },
  form: {
    flex: 2,
    justifyContent: 'space-between'
  },
  root: {
    flex: 1
  },
  scrollView: {
    backgroundColor: '#262664',
    flex: 1
  },
  sloppyMooseLogo: {
    alignItems: 'center',
    flex: 3,
    height: 100,
    justifyContent: 'center',
    width: 100
  },
  textButton: {
    borderWidth: 0
  },
  textButtonLabel: {
    color: 'white',
    fontSize: 12
  }
});
const KeyboardHeightOffset = 25;
const KeyboardScrollOffset = KeyboardHeightOffset / 0.675;

export class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.handleRootPress = this.handleRootPress.bind(this);
    this.handleKeyboardDidHide = this.handleKeyboardDidHide.bind(this);
    this.handleKeyboardWillHide = this.handleKeyboardWillHide.bind(this);
    this.handleKeyboardWillShow = this.handleKeyboardWillShow.bind(this);
    this.state = {
      keyboardHeight: 0,
      keyboardVisible: false
    };
  }
  componentWillMount() {
    StatusBarIOS.setStyle('light-content');
    this._listeners = [
      DeviceEventEmitter.addListener('keyboardDidHide', this.handleKeyboardDidHide),
      DeviceEventEmitter.addListener('keyboardWillHide', this.handleKeyboardWillHide),
      DeviceEventEmitter.addListener('keyboardWillShow', this.handleKeyboardWillShow)
    ];
  }
  componentDidUpdate(prevProps, prevState) {
    if(this.state.keyboardVisible && !prevState.keyboardVisible) {
      this.refs.content.measure((x, y) => {
        this.refs.scrollView.scrollTo(y - KeyboardScrollOffset);
      });
    }
  }
  componentWillUnmount() {
    this._listeners.forEach(listener => listener.remove());
  }
  handleKeyboardDidHide() {
    this.refs.scrollView.scrollTo(0);
  }
  handleKeyboardWillHide() {
    this.setState({
      keyboardHeight: 0,
      keyboardVisible: false
    });
  }
  handleKeyboardWillShow(e) {
    this.setState({
      keyboardHeight: e.endCoordinates.height - KeyboardHeightOffset,
      keyboardVisible: true
    });
  }
  handleRootPress() {
    dismissKeyboard();
  }
  render() {
    const { height } = Dimensions.get('window');
    const reactiveRootStyles = {
      height
    };
    return (
      <ScrollView
        keyboardShouldPersistTaps
        ref="scrollView"
        scrollEnabled={false}
        style={baseStyles.scrollView}
      >
        <TouchableWithoutFeedback onPress={this.handleRootPress}>
          <View style={[baseStyles.root, reactiveRootStyles]}>
            <View style={baseStyles.hero}>
              <View style={baseStyles.sloppyMooseLogo}>
                <Image source={require('image!SplashLogo')}/>
              </View>
            </View>
            <View ref="content" style={baseStyles.content}>
              <View style={baseStyles.form}>
                <SignInForm
                  signInUser={this.props.signInUser}
                  spacerHeight={this.state.keyboardHeight}
                  user={this.props.user}
                />
                <View style={baseStyles.actions}>
                  <Button
                    onPress={this.props.onCreateAccount}
                    style={baseStyles.textButton}
                    textStyle={baseStyles.textButtonLabel}
                  >
                    Create Account
                  </Button>
                  <Button
                    onPress={this.props.onForgotPassword}
                    style={baseStyles.textButton}
                    textStyle={baseStyles.textButtonLabel}
                  >
                    Forgot Password
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

SignInScreen.propTypes = {
  onCreateAccount: PropTypes.func,
  onForgotPassword: PropTypes.func,
  signInUser: PropTypes.func,
  user: PropTypes.any
};
SignInScreen.defaultProps = {
  onCreateAccount: emptyFn,
  onForgotPassword: emptyFn,
  signInUser: emptyFn
};
