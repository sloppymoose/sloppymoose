import { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InputTextColor = '#666';
const DividerColor = '#ccc';
const DefaultFieldHeight = 70;
const DefaultFontSize = 15;
const DefaultIconSize = 18;
const GutterWidth = 10;
const LabelFontSize = DefaultFontSize;
const ValueFontSize = DefaultFontSize;
const baseStyles = StyleSheet.create({
  icon: {
    paddingLeft: GutterWidth
  },
  input: {
    flex: 1
  },
  label: {
    color: InputTextColor,
    fontSize: LabelFontSize
  },
  root: {
    alignItems: 'center',
    borderBottomColor: DividerColor,
    borderBottomWidth: 1,
    height: DefaultFieldHeight,
    flex: 1,
    flexDirection: 'row',
    paddingLeft: GutterWidth,
    paddingRight: GutterWidth
  },
  value: {
    color: 'orange',
    fontSize: ValueFontSize,
    textAlign: 'right'
  }
});

export class FormField extends Component {
  render() {
    let icon;
    if(this.props.icon) {
      icon = (
        <View style={baseStyles.icon}>
          <Icon
            color={InputTextColor}
            name={this.props.icon}
            size={DefaultIconSize}
            {...this.props.iconProps}
          />
        </View>
      );
    }
    return (
      <View style={baseStyles.root}>
        <Text style={baseStyles.label}>
          {this.props.label}
        </Text>
        <View style={baseStyles.input}>
          {this.props.children}
        </View>
        {icon}
      </View>
    );
  }
}

FormField.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
  iconProps: PropTypes.object,
  label: PropTypes.node
};
FormField.styleConfig = {
  dividerColor: DividerColor,
  fieldHeight: DefaultFieldHeight,
  gutterWidth: GutterWidth,
  iconSize: DefaultIconSize,
  labelFontSize: LabelFontSize,
  valueFontSize: ValueFontSize
};
