import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import { initSynth } from './synthesizer'
import ControlsContainer from './containers/ControlsContainer'

const store = createStore(rootReducer)
export default store

initSynth(store)

render(
  <Provider store={store}>
    <ControlsContainer />
  </Provider>,
  document.getElementById('root'),
)
