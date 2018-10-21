export function initializeOsc(ctx, settings, note) {
  const osc = ctx.createOscillator()
  osc.type = settings.waveform
  // Temporary, crude simulation of actual notes
  osc.frequency.setValueAtTime(note * 10, ctx.currentTime)

  return osc
}
