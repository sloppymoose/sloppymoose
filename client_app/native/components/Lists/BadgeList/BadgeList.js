import { BadgeListItem } from './BadgeListItem';
import {
  Component,
  ListView,
  PropTypes,
  StyleSheet,
  View
} from 'react-native';
import emptyAry from 'empty/array';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import RefreshableListView from 'react-native-refreshable-listview';

const baseStyles = StyleSheet.create({
  root: {

  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
const DS = new ListView.DataSource({
  rowHasChanged(a, b) {
    return a !== b;
  }
});

function componentize(item) {
  return <BadgeListItem item={item} key={item.id}/>;
}

export class BadgeList extends Component {
  constructor(props) {
    super(props);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.state = {
      datasource: DS.cloneWithRows(
        props.badges.get('items').toJS()
      )
    };
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.badges.get('items') !== nextProps.badges.get('items')) {
      this.setState({
        datasource: this.state.datasource.cloneWithRows(
          nextProps.badges.get('items').toJS()
        )
      });
    }
  }
  handleRefresh() {
    return this.props.fetchBadges();
  }
  render() {
    return (
      <View style={baseStyles.root}>
        <RefreshableListView
          contentContainerStyle={baseStyles.list}
          dataSource={this.state.datasource}
          loadData={this.handleRefresh}
          refreshDescription="Refreshing badges..."
          renderRow={componentize}
        />
      </View>
    );
  }
}

BadgeList.propTypes = {
  badges: ImmutablePropTypes.contains({
    loading: PropTypes.bool,
    items: ImmutablePropTypes.list
  }),
  fetchBadges: PropTypes.func
};
BadgeList.defaultProps = {
  badges: Immutable.fromJS({
    items: emptyAry
  }),
  fetchBadges: emptyFn
};
