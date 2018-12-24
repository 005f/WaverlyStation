export function initializeLFO(ctx, settings) {
  const lfo = ctx.createOscillator()
  lfo.type = settings.waveform

  lfo.frequency.setValueAtTime(settings.rate, ctx.currentTime)

  return lfo
}
