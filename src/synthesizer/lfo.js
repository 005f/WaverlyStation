import { connectToMulti, createGainNodeForNode } from './utils'

export function initializeLFO(ctx, settings) {
  const lfo = ctx.createOscillator()
  lfo.type = settings.waveform

  lfo.frequency.setValueAtTime(settings.rate, ctx.currentTime)

  return lfo
}

export function createModulation(ctx, source, value, ...destinations) {
  const gain = createGainNodeForNode(ctx, source, value)

  connectToMulti(gain, ...destinations)
}
