import { createAction } from 'redux-actions'
import store from './index'
import { getFilterResponse } from './synthesizer'

export const changeAttack = createAction('CHANGE_ATTACK')
export const changeDecay = createAction('CHANGE_DECAY')
export const changeSustain = createAction('CHANGE_SUSTAIN')
export const changeRelease = createAction('CHANGE_RELEASE')


const changeCutoff = createAction('CHANGE_CUTOFF')
const changeQ = createAction('CHANGE_Q')
const updateFilterResponse = createAction('UPDATE_FILTER_RESPONSE')

export function updateFilterCutoff(cutoff) {
  store.dispatch(changeCutoff(cutoff))
  store.dispatch(updateFilterResponse(getFilterResponse()))
}
export function updateFilterQ(Q) {
  store.dispatch(changeQ(Q))
  store.dispatch(updateFilterResponse(getFilterResponse()))
}


export const changeAmpLevel = createAction('CHANGE_AMP_LEVEL')
