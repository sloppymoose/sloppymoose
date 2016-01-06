import { Component, PropTypes, View } from 'react-native';
import emptyAry from 'empty/array';
import { ActivityListEmpty } from './ActivityListEmpty';
import { ActivityListItem } from './ActivityListItem';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

function componentize(item) {
  return <ActivityListItem item={item} key={item.get('id')}/>;
}

export class ActivityList extends Component {
  render() {
    if(this.props.checkIns.get('items').size < 1) {
      return <ActivityListEmpty/>;
    }
    const items = this.props.checkIns.get('items').map(componentize);
    return (
      <View>
        {items}
      </View>
    );
  }
}

ActivityList.propTypes = {
  checkIns: ImmutablePropTypes.contains({
    loading: PropTypes.bool,
    items: ImmutablePropTypes.list
  })
};
ActivityList.defaultProps = {
  checkIns: Immutable.fromJS({
    items: emptyAry
  })
};
