const adsr = (
  state = {
    attackTime: 0.01,
    decayTime: 0.6,
    decayCurve: 'exp',
    sustainLevel: 0.05,
    releaseTime: 0.3,
    peakLevel: 0.08,
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

export default adsr
