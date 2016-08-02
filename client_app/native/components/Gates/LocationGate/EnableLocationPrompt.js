import Button from 'apsl-react-native-button';
import { Component, PropTypes } from 'react';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { StyleSheet, Text, View } from 'react-native';

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
    marginLeft: 10,
    marginRight: 10
  },
  enableButton: {
    backgroundColor: 'orange',
    marginLeft: 10,
    marginRight: 10
  },
  enableButtonLabel: {
    color: 'white'
  },
  paragraph: {
    marginTop: 10,
    textAlign: 'center'
  },
  root: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
});

export class EnableLocationPrompt extends Component {
  constructor(props) {
    super(props);
    this.handleClickEnable = this.handleClickEnable.bind(this);
  }
  handleClickEnable() {
    this.props.requestLocationAccess();
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
        </View>
        <View style={baseStyles.actions}>
          <Button
            onPress={this.handleClickEnable}
            style={[baseStyles.button, baseStyles.enableButton]}
            textStyle={baseStyles.enableButtonLabel}
          >
            Grant Location Permission
          </Button>
        </View>
      </View>
    );
  }
}

EnableLocationPrompt.propTypes = {
  beacons: ImmutablePropTypes.contains({
    enabled: PropTypes.bool
  }),
  requestLocationAccess: PropTypes.func
};
EnableLocationPrompt.defaultProps = {
  beacons: Immutable.Map(),
  requestLocationAccess: emptyFn
};
