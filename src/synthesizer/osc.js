import { semitonesAsCents } from './utils'

export function initializeOsc(ctx, settings, note) {
  const osc = ctx.createOscillator()
  osc.type = settings.waveform

  // Temporary, crude simulation of actual notes
  osc.frequency.setValueAtTime(note * 10, ctx.currentTime)

  osc.detune.setValueAtTime(
    settings.cents + semitonesAsCents(settings.semitones),
    ctx.currentTime,
  )

  return osc
}
