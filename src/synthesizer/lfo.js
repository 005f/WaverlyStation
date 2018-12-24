import { connectToMulti } from './utils'
import { createGainNodeForOsc } from './osc'

export function initializeLFO(ctx, settings) {
  const lfo = ctx.createOscillator()
  lfo.type = settings.waveform

  lfo.frequency.setValueAtTime(settings.rate, ctx.currentTime)

  return lfo
}

export function createModulation(ctx, source, value, ...destinations) {
  const gain = createGainNodeForOsc(ctx, source, value)

  connectToMulti(gain, ...destinations)
}
