import {
  Component,
  PropTypes,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { FormField } from './FormField';

const baseStyles = StyleSheet.create({
  input: {
    alignSelf: 'flex-end',
    justifyContent: 'center'
  }
});

export class FormCheckbox extends Component {
  constructor(props) {
    super(props);
    this.handlePress = this.handlePress.bind(this);
  }
  handlePress() {
    this.refs.input.focus();
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handlePress}>
        <View>
          <FormField label={this.props.label}>
            <Switch
              ref="input"
              {...this.props}
              style={baseStyles.input}
            />
          </FormField>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

FormCheckbox.propTypes = {
  label: PropTypes.string
};
