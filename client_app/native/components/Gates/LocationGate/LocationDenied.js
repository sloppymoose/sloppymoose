import Button from 'apsl-react-native-button';
import { Component, PropTypes } from 'react';
import emptyFn from 'empty/function';
import { Navigator, StyleSheet, Text, View } from 'react-native';
import RNOpenSettings from 'react-native-open-settings';

const baseStyles = StyleSheet.create({
  actions: {
    flex: 1
  },
  button: {
    borderWidth: 0
  },
  content: {
    flex: 4,
    justifyContent: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  list: {
    marginLeft: 60,
    marginRight: 60,
    marginTop: 20
  },
  openSettingsButton: {
    backgroundColor: 'orange',
    marginLeft: 10,
    marginRight: 10
  },
  openSettingsButtonLabel: {
    color: 'white'
  },
  paragraph: {
    marginTop: 10,
    textAlign: 'center'
  },
  root: {
    flex: 1,
    marginTop: 20 + Navigator.NavigationBar.Styles.General.NavBarHeight
  }
});

export class LocationDenied extends Component {
  constructor(props) {
    super(props);
    this.handleOpenSettings = this.handleOpenSettings.bind(this);
  }
  handleOpenSettings() {
    this.props.openSettings();
  }
  render() {
    return (
      <View style={baseStyles.root}>
        <View style={baseStyles.content}>
          <Text style={baseStyles.paragraph}>
            In order to check in to a Sloppy Moose event, you need to share
            your location with us!
          </Text>
          <Text style={baseStyles.paragraph}>
            This lets us verify that you are, in fact, at one of our events.
          </Text>
          <View style={baseStyles.list}>
            <Text>
              1. Go to Settings
            </Text>
            <Text>
              2. Tap "Location"
            </Text>
            <Text>
              3. Tap "While Using the App"
            </Text>
          </View>
        </View>
        <View style={baseStyles.actions}>
          <Button
            onPress={this.handleOpenSettings}
            style={[baseStyles.button, baseStyles.openSettingsButton]}
            textStyle={baseStyles.openSettingsButtonLabel}
          >
            Open Settings
          </Button>
        </View>
      </View>
    );
  }
}

LocationDenied.propTypes = {
  onManualChange: PropTypes.func,
  openSettings: PropTypes.func
};
LocationDenied.defaultProps = {
  onManualChange: emptyFn,
  openSettings: RNOpenSettings.openSettings
};
