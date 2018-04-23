import { createAction } from 'redux-actions'

export const changeAttack = createAction('CHANGE_ATTACK')
export const changeDecay = createAction('CHANGE_DECAY')
export const changeSustain = createAction('CHANGE_SUSTAIN')
export const changeRelease = createAction('CHANGE_RELEASE')

export const changeAmpLevel = createAction('CHANGE_AMP_LEVEL')
