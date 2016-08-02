import { CheckInableEvent } from './CheckInableEvent';
import { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { StyleSheet, View } from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1
  }
});

function componentize(event, i) {
  return <CheckInableEvent event={event} key={event.get('id')}/>;
}

export class InRangeEvents extends Component {
  render() {
    const events = this.props.events.map(componentize);
    return (
      <View style={baseStyles.root}>
        {events}
      </View>
    );
  }
}

InRangeEvents.propTypes = {
  events: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      id: PropTypes.string
    })
  )
};
InRangeEvents.defaultProps = {
  events: Immutable.List()
};
