import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import envelope from './reducers'
import initSynth from './synthEngine'
import ControlsContainer from './containers/ControlsContainer'

const store = createStore(envelope)
initSynth(store)

render(
  <Provider store={store}>
    <ControlsContainer />
  </Provider>,
  document.getElementById('root'),
)
