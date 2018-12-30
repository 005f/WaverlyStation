import { semitonesAsCents } from './utils'

export function initializeOsc(ctx, settings, frequency) {
  const osc = ctx.createOscillator()
  osc.type = settings.waveform

  osc.frequency.setValueAtTime(frequency, ctx.currentTime)

  osc.detune.setValueAtTime(
    settings.cents + semitonesAsCents(settings.semitones),
    ctx.currentTime,
  )

  return osc
}
