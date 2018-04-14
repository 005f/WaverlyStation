export const CHANGE_DECAY = 'CHANGE_DECAY'

export function changeDecay(level) {
  return {
    type: CHANGE_DECAY,
    level,
  }
}
