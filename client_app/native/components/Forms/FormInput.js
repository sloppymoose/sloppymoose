import {
  Component,
  PropTypes,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { FormField } from './FormField';

const baseStyles = StyleSheet.create({
  input: {
    height: 22,
    textAlign: 'right'
  }
});

export class FormInput extends Component {
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
            <TextInput
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

FormInput.propTypes = {
  label: PropTypes.string
};
