import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { initSynth } from './synthesizer'
import ControlsContainer from './containers/ControlsContainer'
import KeyboardContainer from './containers/KeyboardContainer'

import './global.css'

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
/* eslint-enable */

export default store

initSynth(store)

render(
  <Provider store={store}>
    <div>
      <ControlsContainer />

      <KeyboardContainer />
    </div>
  </Provider>,
  document.getElementById('root'),
)
