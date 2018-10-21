export function initializeOsc(ctx, settings, note) {
  const osc = ctx.createOscillator()
  osc.type = settings.waveform
  console.log(osc.type)
  // Temporary, crude simulation of actual notes
  osc.frequency.setValueAtTime(note * 10, ctx.currentTime)

  const semitonesAsCents = settings.semitones * 100
  osc.detune.setValueAtTime(settings.cents + semitonesAsCents, ctx.currentTime)

  return osc
}

export function createGainNodeForOsc(ctx, osc, level) {
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(level, ctx.currentTime)

  osc.connect(gain)

  return gain
}