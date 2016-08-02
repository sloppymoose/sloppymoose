import { Component, PropTypes } from 'react';
import { Text } from 'react-native';

const baseStyles = {
  selected: {
    [false]: {
      color: '#666'
    },
    [true]: {
      color: 'blue'
    }
  }
};

export default class TabIcon extends Component {
  render() {
    return (
      <Text style={baseStyles.selected[this.props.selected]}>
        {this.props.title}
      </Text>
    );
  }
}

TabIcon.propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string
};

TabIcon.defaultProps = {
  selected: false
};
