import { Component, PropTypes } from 'react';
import { EventCheckInButton } from '../../Buttons';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Navigator, StyleSheet, Text, VibrationIOS, View } from 'react-native';

const baseStyles = StyleSheet.create({
  action: {
    position: 'absolute',
    bottom: 20 + Navigator.NavigationBar.Styles.General.NavBarHeight,
    left: 20,
    right: 20
  },
  content: {
    flex: 1,
    backgroundColor: '#333'
  },
  details: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20
  },
  hero: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  root: {
    flex: 1
  },
  title: {
    color: 'white',
    fontSize: 22,
    marginBottom: 10
  }
});

export class CheckInableEvent extends Component {
  componentWillMount() {
    VibrationIOS.vibrate();
  }
  render() {
    const eventName = this.props.event.getIn(['attributes', 'name']);
    return (
      <View style={baseStyles.root}>
        <View style={baseStyles.content}>
          <View style={baseStyles.hero}>
            <Text style={baseStyles.title}>
              {eventName}
            </Text>
          </View>
          <View style={baseStyles.details}>
            <Text>
              You found Mousse! Click the button below to check-in to the event!
            </Text>
          </View>
        </View>
        <View style={baseStyles.action}>
          <EventCheckInButton event={this.props.event}/>
        </View>
      </View>
    );
  }
}

CheckInableEvent.propTypes = {
  event: ImmutablePropTypes.contains({
    attributes: ImmutablePropTypes.contains({
      name: PropTypes.string
    })
  })
};
CheckInableEvent.defaultProps = {
  event: Immutable.Map()
};
