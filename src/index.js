import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import adsr from './reducers'
import initSynth from './synthEngine'
import ControlsContainer from './ControlsContainer'

const store = createStore(adsr)
initSynth(store)

render(
  <Provider store={store}>
    <ControlsContainer />
  </Provider>,
  document.getElementById('root'),
)
