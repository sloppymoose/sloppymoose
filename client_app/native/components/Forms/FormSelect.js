import {
  Children,
  Component,
  Modal,
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import emptyFn from 'empty/function';
import { FormField } from './FormField';
import NavigationBar from 'react-native-navbar';
import { partial } from 'lodash';

const InputTextColor = '#c7c7cd';
const baseStyles = StyleSheet.create({
  item: {
    borderBottomColor: FormField.styleConfig.dividerColor,
    borderBottomWidth: 1,
    flex: 1,
    height: FormField.styleConfig.fieldHeight,
    justifyContent: 'center',
    paddingLeft: FormField.styleConfig.gutterWidth,
    paddingRight: FormField.styleConfig.gutterWidth
  },
  modal: {
    backgroundColor: 'white',
    flex: 1
  },
  value: {
    color: 'orange',
    fontSize: FormField.styleConfig.valueFontSize,
    textAlign: 'right'
  }
});

function itemize(selectedValue, handleItemSelected, item, i) {
  return (
    <TouchableHighlight
      key={item.key}
      onPress={partial(handleItemSelected, item, i)}
      underlayColor={InputTextColor}
    >
      <View style={baseStyles.item}>
        {item}
      </View>
    </TouchableHighlight>
  );
}

export class FormSelect extends Component {
  constructor(props) {
    super(props);
    this.handleItemSelected = this.handleItemSelected.bind(this);
    this.handleModalToggle = this.handleModalToggle.bind(this);
    this.state = {
      visible: false
    };
  }
  handleItemSelected(item, selectedIndex) {
    this.props.onChangeSelected(item, selectedIndex);
    this.setState({
      visible: !this.state.visible
    });
  }
  handleModalToggle() {
    this.setState({
      visible: !this.state.visible
    });
  }
  render() {
    const children = Children.map(this.props.children, partial(itemize, this.props.value, this.handleItemSelected));
    return (
      <View style={baseStyles.root}>
        <TouchableHighlight
          onPress={this.handleModalToggle}
          underlayColor={InputTextColor}
        >
          <View>
            <FormField icon="ios-arrow-right" label={this.props.label}>
              <Text style={baseStyles.value}>
                {this.props.value}
              </Text>
            </FormField>
          </View>
        </TouchableHighlight>
        <Modal visible={this.state.visible}>
          <NavigationBar
            leftButton={{ handler: this.handleModalToggle, title: 'Cancel' }}
            title={{ title: this.props.label }}
          />
          <ScrollView
            showsVerticalScrollIndicator
            style={baseStyles.modal}
          >
            {children}
          </ScrollView>
        </Modal>
      </View>
    );
  }
}
FormSelect.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  onChangeSelected: PropTypes.func,
  style: PropTypes.number,
  value: PropTypes.node
};
FormSelect.defaultProps = {
  onChangeSelected: emptyFn
};
