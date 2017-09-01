const LocalStorage = require('node-localstorage').LocalStorage
const localStorage = new LocalStorage('./tmp/test-localStorage')

export { localStorage as AsyncStorage }

const Alert = {
  alert: (title, message, buttons) => {
    buttons[0].onPress()
  }
}

export { Alert }
