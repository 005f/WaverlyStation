const adsr = (
  state = {
    decayTime: 0.6,
    decayCurve: 'exp',
    sustainLevel: 0.05,
    releaseTime: 0.3,
    peakLevel: 0.08,
  },
  action,
  ) => {
  switch (action.type) {
    case 'CHANGE_DECAY':
      return Object.assign({}, state, { decayTime: action.level })
    default:
      return state
  } 
}

export default adsr
