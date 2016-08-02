import { ActivityListItem } from './ActivityListItem';
import { Component, PropTypes } from 'react';
import emptyAry from 'empty/array';
import emptyFn from 'empty/function';
import Immutable from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { ListView, RefreshControl, StyleSheet, View } from 'react-native';

const baseStyles = StyleSheet.create({
  root: {
    flex: 1
  }
});
const DS = new ListView.DataSource({
  rowHasChanged(a, b) {
    return a !== b;
  }
});

function componentize(rowData, sectionID, rowID, highlightRow) {
  return <ActivityListItem item={rowData} key={rowData.id}/>;
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
    // TODO: Add Refresh Prompt to render ActivityListEmpty when empty
    const loading = this.props.checkIns.get('loading');
    const refreshControl = (
      <RefreshControl
        onRefresh={this.handleRefresh}
        refreshing={loading}
        title="Refreshing activities..."
      />
    );
    return (
      <View style={baseStyles.root}>
        <ListView
          dataSource={this.state.datasource}
          enableEmptySections
          refreshControl={refreshControl}
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
