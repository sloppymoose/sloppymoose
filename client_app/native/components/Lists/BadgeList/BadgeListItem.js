import { Component, PropTypes } from 'react';
import emptyObj from 'empty/object';
import { get } from 'lodash';
import { StyleSheet, Text, View } from 'react-native';

const baseStyles = StyleSheet.create({
  name: {
    textAlign: 'center'
  },
  root: {
    backgroundColor: '#eee',
    height: 100,
    margin: 10,
    padding: 3,
    width: 100
  }
});

export class BadgeListItem extends Component {
  render() {
    const attributes = get(this.props.item, 'attributes', emptyObj);
    return (
      <View style={baseStyles.root}>
        <Text style={baseStyles.name}>
          {attributes.display_name}
        </Text>
      </View>
    );
  }
}

BadgeListItem.propTypes = {
  item: PropTypes.shape({
    /* eslint-disable camelcase */
    attributes: PropTypes.shape({
      description: PropTypes.string,
      display_name: PropTypes.string,
      image_name: PropTypes.string,
      name: PropTypes.string
    })
    /* eslint-enable camelcase */
  })
};

BadgeListItem.defaultProps = {
  item: emptyObj
};
