export function initializeOsc(ctx, settings, note) {
  const osc = ctx.createOscillator()
  osc.type = settings.waveform
  // Temporary, crude simulation of actual notes
  osc.frequency.setValueAtTime(note * 10, ctx.currentTime)

  const semitonesAsCents = settings.semitones * 100
  osc.detune.setValueAtTime(settings.cents + semitonesAsCents, ctx.currentTime)

  return osc
}
