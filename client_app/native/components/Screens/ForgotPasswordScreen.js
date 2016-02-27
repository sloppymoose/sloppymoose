import {
  Component,
  Navigator,
  PropTypes,
  StyleSheet,
  Text,
  View
} from 'react-native';
import emptyFn from 'empty/function';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 20 + Navigator.NavigationBar.Styles.General.NavBarHeight
  }
});

export class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBack = this.handleBack.bind(this);
  }
  handleBack() {
    this.props.onBackPress();
  }
  render() {
    return (
      <View style={baseStyles.root}>
        <Text>Coming Soon!</Text>
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
