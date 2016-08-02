import { BadgeListItem } from './BadgeListItem';
import { Component, PropTypes } from 'react';
import emptyAry from 'empty/array';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ListView, RefreshControl, StyleSheet, View } from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1
  },
  listCt: {
    flexDirection: 'row'
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
    const loading = this.props.badges.get('loading');
    const refreshControl = (
      <RefreshControl
        onRefresh={this.handleRefresh}
        refreshing={loading}
        title="Refreshing badges..."
      />
    );
    return (
      <View style={baseStyles.root}>
        <ListView
          contentContainerStyle={baseStyles.listCt}
          dataSource={this.state.datasource}
          enableEmptySections
          refreshControl={refreshControl}
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
