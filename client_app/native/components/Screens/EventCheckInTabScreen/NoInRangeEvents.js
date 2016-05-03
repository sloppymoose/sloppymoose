import {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

const baseStyles = StyleSheet.create({
  content: {
    flex: 1
  },
  hero: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end'
  },
  paragraph: {
    margin: 10,
    paddingLeft: 40,
    paddingRight: 40,
    color: 'white',
    textAlign: 'center'
  },
  root: {
    flex: 1,
    padding: 10,
    width: null,
    height: null
  },
  title: {
    fontSize: 22,
    color: 'white'
  }
});

export class NoInRangeEvents extends Component {
  render() {
    return (
      <Image
        resizeMode={Image.resizeMode.cover}
        source={require('image!NoInRangeEventsBackground')}
        style={baseStyles.root}
      >
        <View style={baseStyles.hero}>
          <Text style={baseStyles.title}>Find Mousse!</Text>
        </View>
        <View style={baseStyles.content}>
          <Text style={baseStyles.paragraph}>
            In order to check in to an event, you need to find Mousse!
          </Text>
          <Text style={baseStyles.paragraph}>
            Getting close to her will unlock the ability to check in.
          </Text>
        </View>
      </Image>
    );
  }
}
