import { Component, PropTypes, StyleSheet, Text, View } from 'react-native';
import emptyObj from 'empty/object';
import { get } from 'lodash';
import moment from 'moment';

const baseStyles = StyleSheet.create({
  age: {
    color: '#ccc',
    fontWeight: 'bold'
  },
  root: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 75,
    padding: 10
  },
  title: {
    flex: 1
  }
});

export class ActivityListItem extends Component {
  render() {
    const attributes = get(this.props.item, 'attributes', emptyObj);
    /* eslint-disable camelcase */
    const eventName = attributes.event_name || 'N/A';
    /* eslint-enable camelcase */
    const age = moment(attributes.updated_at).fromNow();
    return (
      <View style={baseStyles.root}>
        <Text style={baseStyles.title}>
          {eventName}
        </Text>
        <Text style={baseStyles.age}>
          {age}
        </Text>
      </View>
    );
  }
}

ActivityListItem.propTypes = {
  item: PropTypes.shape({
    /* eslint-disable camelcase */
    attributes: PropTypes.shape({
      event_name: PropTypes.string,
      updated_at: PropTypes.string
    })
    /* eslint-enable camelcase */
  })
};
ActivityListItem.defaultProps = {
  item: emptyObj
};
