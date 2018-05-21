import ADSREnvelope from 'adsr-envelope'
import store from '../index'
import { createFilter, updateFilter, getLogFilterResponse } from './filter'

window.AudioContext = window.AudioContext || window.webkitAudioContext

const ctx = new AudioContext()
// Sample rate is read only and depends on user system
window.SAMPLE_RATE = ctx.sampleRate

const lockedKeys = {}

let settings = {}
let filter1

function playNote(note) {
  const osc = ctx.createOscillator()
  osc.type = 'square'
  // Temporary, crude simulation of actual notes
  osc.frequency.setValueAtTime(note * 10, ctx.currentTime)

  // We use 2 filters to simulate a 4-pole filter with 24db per octave of roll off
  // With the extra filter, we have to half the Q to prevent double resonance
  filter1 = createFilter(ctx, 'lowpass', settings.filter.cutoff, settings.filter.Q / 2)
  const filter2 = createFilter(ctx, 'lowpass', settings.filter.cutoff, settings.filter.Q / 2)

  const env = new ADSREnvelope({
    decayTime: settings.envelope.decayTime,
    decayCurve: settings.envelope.decayCurve,
    sustainLevel: settings.envelope.sustainLevel,
    releaseTime: settings.envelope.releaseTime,
    peakLevel: settings.envelope.peakLevel,
  })
  env.gateTime = Infinity
  const envGain = ctx.createGain()
  env.applyTo(envGain.gain, ctx.currentTime)

  const masterGain = ctx.createGain()
  masterGain.gain.setValueAtTime(settings.amplifier.level, ctx.currentTime)

  osc.connect(filter1)
  filter1.connect(envGain)
  filter2.connect(envGain)
  envGain.connect(masterGain)
  masterGain.connect(ctx.destination)

  osc.start(ctx.currentTime)

  const startTime = ctx.currentTime

  store.subscribe(() => {
    const newState = store.getState()

    updateFilter(
      ctx,
      filter1,
      'lowpass',
      newState.filter.cutoff,
      newState.filter.Q / 2,
    )
    updateFilter(
      ctx,
      filter2,
      'lowpass',
      newState.filter.cutoff,
      newState.filter.Q / 2,
    )
  })

  const releaseNote = () => {
    envGain.gain.cancelScheduledValues(startTime)
    env.gateTime = ctx.currentTime - startTime
    env.applyTo(envGain.gain, startTime)

    osc.stop(startTime + env.duration)

    lockedKeys[note] = false
  }

  document.addEventListener('keyup', releaseNote)

  // Clean up after note is finished playing
  osc.onended = () => {
    document.removeEventListener('keyup', releaseNote)
    osc.disconnect()
    envGain.disconnect()
  }
}

const handleKeydown = (e) => {
  // keydown event fires multiple times so we only handle the first event
  if (!lockedKeys[e.keyCode]) {
    lockedKeys[e.keyCode] = true

    playNote(e.keyCode)
  }
}

export const getLogFilterResponseFromSettings = () => getLogFilterResponse(
  settings.filter.cutoff,
  settings.filter.Q,
)

export function initSynth(reduxStore) {
  settings = reduxStore.getState()
  reduxStore.subscribe(() => {
    settings = reduxStore.getState()
  })

  document.addEventListener('keydown', handleKeydown)
}
