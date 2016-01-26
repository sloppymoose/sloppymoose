import {
  Component,
  ListView,
  PropTypes,
  View
} from 'react-native';
import emptyAry from 'empty/array';
import { ActivityListEmpty } from './ActivityListEmpty';
import { ActivityListItem } from './ActivityListItem';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RefreshableListView from 'react-native-refreshable-listview';

const baseStyles = {
  root: {
    flex: 1
  }
};
const DS = new ListView.DataSource({
  rowHasChanged(a, b) {
    return a !== b;
  }
});

function componentize(item) {
  return <ActivityListItem item={item} key={item.id}/>;
}

export class ActivityList extends Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.state = {
      datasource: DS.cloneWithRows(
        props.checkIns.get('items').toJS()
      )
    };
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.checkIns.get('items') !== nextProps.checkIns.get('items')) {
      this.setState({
        datasource: this.state.datasource.cloneWithRows(
          nextProps.checkIns.get('items').toJS()
        )
      });
    }
  }
  handleRefresh() {
    return this.props.fetchCheckIns();
  }
  render() {
    if(this.props.checkIns.get('items').size < 1) {
      return <ActivityListEmpty/>;
    }
    return (
      <View style={baseStyles.root}>
        <RefreshableListView
          dataSource={this.state.datasource}
          loadData={this.handleRefresh}
          refreshDescription="Refreshing activities..."
          renderRow={componentize}
        />
      </View>
    );
  }
}

ActivityList.propTypes = {
  checkIns: ImmutablePropTypes.contains({
    loading: PropTypes.bool,
    items: ImmutablePropTypes.list
  }),
  fetchCheckIns: PropTypes.func
};
ActivityList.defaultProps = {
  checkIns: Immutable.fromJS({
    items: emptyAry
  }),
  fetchCheckIns: emptyFn
};
