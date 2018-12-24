import ADSREnvelope from 'adsr-envelope'
import store from '../index'
import { updateFilterResponse } from '../actions'
import { initializeLFO } from './lfo'
import { createGainNodeForOsc, initializeOsc } from './osc'
import { createFilter, updateFilter, getLogFilterResponse } from './filter'
import { connectToMulti } from './utils'

import { LFO_A, LFO_B, OSC_A, OSC_B } from '../constants'

window.AudioContext = window.AudioContext || window.webkitAudioContext

const ctx = new AudioContext()
// Sample rate is read only and depends on user system
window.SAMPLE_RATE = ctx.sampleRate

const lockedKeys = {}

let settings = {}
let filter1

function playNote(note) {
  const lfoA = initializeLFO(ctx, settings.lfo[LFO_A])
  const lfoB = initializeLFO(ctx, settings.lfo[LFO_B])

  const lfoAFilterRes = createGainNodeForOsc(ctx, lfoA, settings.lfo[LFO_A].sends.filterFreq)
  const lfoAFilterFreq = createGainNodeForOsc(ctx, lfoA, settings.lfo[LFO_A].sends.filterRes)
  const lfoBFilterRes = createGainNodeForOsc(ctx, lfoB, settings.lfo[LFO_B].sends.filterFreq)
  const lfoBFilterFreq = createGainNodeForOsc(ctx, lfoB, settings.lfo[LFO_B].sends.filterRes)

  const oscA = initializeOsc(ctx, settings.osc[OSC_A], note)
  const oscB = initializeOsc(ctx, settings.osc[OSC_B], note)

  const oscAGain = createGainNodeForOsc(ctx, oscA, settings.osc[OSC_A].gain)
  const oscBGain = createGainNodeForOsc(ctx, oscB, settings.osc[OSC_B].gain)

  // We use 2 filters to simulate a 4-pole filter with 24db per octave of roll off
  // With the extra filter, we have to half the Q to prevent double resonance
  filter1 = createFilter(ctx, 'lowpass', settings.filter.cutoff, settings.filter.Q / 2)
  const filter2 = createFilter(ctx, 'lowpass', settings.filter.cutoff, settings.filter.Q / 2)

  connectToMulti(lfoAFilterRes, filter1.frequency, filter2.frequency)
  connectToMulti(lfoAFilterFreq, filter1.Q, filter2.Q)

  connectToMulti(lfoBFilterRes, filter1.frequency, filter2.frequency)
  connectToMulti(lfoBFilterFreq, filter1.Q, filter2.Q)

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

  oscAGain.connect(filter1)
  oscBGain.connect(filter1)
  filter1.connect(envGain)
  filter2.connect(envGain)
  envGain.connect(masterGain)
  masterGain.connect(ctx.destination)

  oscA.start(ctx.currentTime)
  oscB.start(ctx.currentTime)

  lfoA.start(ctx.currentTime)
  lfoB.start(ctx.currentTime)

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

    oscA.stop(startTime + env.duration)
    oscB.stop(startTime + env.duration)

    lfoA.stop(startTime + env.duration)
    lfoB.stop(startTime + env.duration)

    lockedKeys[note] = false
  }

  document.addEventListener('keyup', releaseNote)

  // Clean up after note is finished playing
  oscA.onended = () => {
    document.removeEventListener('keyup', releaseNote)
    oscA.disconnect()
    envGain.disconnect()
  }
  oscB.onended = () => {
    document.removeEventListener('keyup', releaseNote)
    oscB.disconnect()
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

  reduxStore.dispatch(updateFilterResponse(getLogFilterResponseFromSettings()))

  document.addEventListener('keydown', handleKeydown)
}
