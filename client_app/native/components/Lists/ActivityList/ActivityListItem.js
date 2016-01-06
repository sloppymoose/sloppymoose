import { Component, PropTypes, Text, View } from 'react-native';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

export class ActivityListItem extends Component {
  render() {
    return (
      <View>
        <Text>
          {this.props.item.getIn(['attributes', 'event_name'])}
        </Text>
      </View>
    );
  }
}

ActivityListItem.propTypes = {
  item: ImmutablePropTypes.contains({
    /* eslint-disable camelcase */
    attributes: PropTypes.object,
    event_name: PropTypes.string
    /* eslint-enable camelcase */
  })
};
ActivityListItem.defaultProps = {
  item: Immutable.Map()
};
