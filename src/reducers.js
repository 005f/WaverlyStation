import { combineReducers } from 'redux'
import { WAVEFORM_TYPE_SINE } from 'constants'

const osc = (
  state = {
    waveform: WAVEFORM_TYPE_SINE,
  },
  action,
) => {
  switch (action.type) {
    case 'CHANGE_WAVEFORM':
      return Object.assign({}, state, { waveform: action.payload })
    default:
      return state
  }
}

const envelope = (
  state = {
    attackTime: 0.01,
    decayTime: 0.6,
    decayCurve: 'exp',
    sustainLevel: 0.05,
    releaseTime: 0.3,
    peakLevel: 0.1,
  },
  action,
) => {
  switch (action.type) {
    case 'CHANGE_ATTACK':
      return Object.assign({}, state, { attackTime: action.payload })
    case 'CHANGE_DECAY':
      return Object.assign({}, state, { decayTime: action.payload })
    case 'CHANGE_SUSTAIN':
      return Object.assign({}, state, { sustainLevel: action.payload })
    case 'CHANGE_RELEASE':
      return Object.assign({}, state, { releaseTime: action.payload })
    default:
      return state
  }
}

const filter = (
  state = {
    cutoff: 350,
    Q: 1,
    response: new Float32Array(),
  },
  action,
) => {
  switch (action.type) {
    case 'CHANGE_CUTOFF':
      return Object.assign({}, state, { cutoff: action.payload })
    case 'CHANGE_Q':
      return Object.assign({}, state, { Q: action.payload })
    case 'UPDATE_FILTER_RESPONSE':
      return Object.assign({}, state, { response: action.payload })
    default:
      return state
  }
}

const amplifier = (
  state = { level: 0.5 },
  action,
) => {
  switch (action.type) {
    case 'CHANGE_AMP_LEVEL':
      return Object.assign({}, state, { level: action.payload })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  osc,
  envelope,
  filter,
  amplifier,
})

export default rootReducer
