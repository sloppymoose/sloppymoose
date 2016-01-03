import {
  Component,
  Modal,
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import NavigationBar from 'react-native-navbar';

const baseStyles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    flex: 1
  },
  paragraph: {
    marginTop: 10
  },
  root: {
    flex: 1
  },
  scrollView: {
    marginLeft: 10,
    marginRight: 10
  }
});

export class SafetyWaiverModal extends Component {
  constructor(props) {
    super(props);
    this.handleDone = this.handleDone.bind(this);
  }
  handleDone(e) {
    this.props.onDone(e);
  }
  render() {
    return (
      <Modal
        animated
        visible={this.props.visible}
      >
        <NavigationBar
          rightButton={{ handler: this.handleDone, title: 'Done' }}
          title={{ title: 'Safety Waiver' }}
        />
        <View style={baseStyles.root}>
          <View style={baseStyles.content}>
            <ScrollView
              showsVerticalScrollIndicator
              style={baseStyles.scrollView}
            >
              <Text style={baseStyles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={baseStyles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={baseStyles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              <Text style={baseStyles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  }
}
SafetyWaiverModal.propTypes = {
  onDone: PropTypes.func,
  visible: PropTypes.bool
};
SafetyWaiverModal.defaultProps = {
  onDone: emptyFn,
  visible: false
};
