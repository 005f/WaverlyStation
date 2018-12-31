import ADSREnvelope from 'adsr-envelope'
import store from '../index'
import {
  updateFilterTargetFreqs,
  updateFilterResponse,
  updatePlayingKeys,
} from '../actions'
import {
  calculateFilterResponse,
  createFilter,
  updateFilter,
  getLogScaleFrequencySample,
} from './filter'
import { createGainNodeForNode } from './utils'
import { createModulation, initializeLFO } from './lfo'
import { createWhitenoiseBuffer, createWhiteNoiseNode } from './noise'
import { initializeOsc } from './osc'
import keyboardMapping from './keyboard'

import {
  FILTER_GRAPH_FREQ_RESOLUTION,
  LFO_A,
  LFO_B,
  OSC_A,
  OSC_B,
} from '../constants'

window.AudioContext = window.AudioContext || window.webkitAudioContext

const ctx = new AudioContext()
// Sample rate is read only and depends on user system
window.SAMPLE_RATE = ctx.sampleRate

const whiteNoiseBuffer = createWhitenoiseBuffer(ctx)

let settings = {}
let filter1

function playNote(note) {
  const lfoA = initializeLFO(ctx, settings.lfo[LFO_A])
  const lfoB = initializeLFO(ctx, settings.lfo[LFO_B])

  const lfoASends = settings.lfo[LFO_A].sends
  const lfoBSends = settings.lfo[LFO_B].sends

  const noise = createWhiteNoiseNode(ctx, whiteNoiseBuffer)
  const noiseGain = createGainNodeForNode(ctx, noise, settings.noise.amount)

  const oscA = initializeOsc(ctx, settings.osc[OSC_A], note)
  const oscB = initializeOsc(ctx, settings.osc[OSC_B], note)

  const oscAGain = createGainNodeForNode(ctx, oscA, settings.osc[OSC_A].gain)
  const oscBGain = createGainNodeForNode(ctx, oscB, settings.osc[OSC_B].gain)

  // We use 2 filters to simulate a 4-pole filter with 24db per octave of roll off
  // With the extra filter, we have to half the Q to prevent double resonance
  filter1 = createFilter(
    ctx,
    'lowpass',
    settings.filter.cutoff,
    settings.filter.Q / 2,
  )
  const filter2 = createFilter(
    ctx,
    'lowpass',
    settings.filter.cutoff,
    settings.filter.Q / 2,
  )

  const env = new ADSREnvelope({
    attackTime: settings.envelope.attackTime,
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
  masterGain.gain.setValueAtTime(settings.amplifier.level / 2, ctx.currentTime)

  noiseGain.connect(filter1)
  noiseGain.connect(filter2)
  oscAGain.connect(filter1)
  oscBGain.connect(filter1)
  oscAGain.connect(filter2)
  oscBGain.connect(filter2)

  filter1.connect(envGain)
  filter2.connect(envGain)
  envGain.connect(masterGain)
  masterGain.connect(ctx.destination)

  createModulation(ctx, lfoA, lfoASends.filterFreq, filter1.frequency, filter2.frequency)
  createModulation(ctx, lfoA, lfoASends.filterRes, filter1.Q, filter2.Q)
  createModulation(ctx, lfoA, lfoASends.oscAFine, oscA.detune)
  createModulation(ctx, lfoA, lfoASends.oscBFine, oscB.detune)

  createModulation(ctx, lfoB, lfoBSends.filterFreq, filter1.frequency, filter2.frequency)
  createModulation(ctx, lfoB, lfoBSends.filterRes, filter1.Q, filter2.Q)
  createModulation(ctx, lfoA, lfoBSends.oscAFine, oscA.detune)
  createModulation(ctx, lfoA, lfoBSends.oscBFine, oscB.detune)


  oscA.start(ctx.currentTime)
  oscB.start(ctx.currentTime)

  noise.start(ctx.currentTime)

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
    store.dispatch(updatePlayingKeys({ [note]: false }))

    envGain.gain.cancelScheduledValues(startTime)
    env.gateTime = ctx.currentTime - startTime
    env.applyTo(envGain.gain, startTime)

    oscA.stop(startTime + env.duration)
    oscB.stop(startTime + env.duration)

    lfoA.stop(startTime + env.duration)
    lfoB.stop(startTime + env.duration)
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

function handleKeydown(e) {
  const note = keyboardMapping[e.keyCode]

  // keydown event fires multiple times so we only handle the first event
  if (!settings.keys.playing[note]) {
    store.dispatch(updatePlayingKeys({ [note]: true }))

    playNote(note)
  }
}

export const getLogFilterResponseFromSettings = () => calculateFilterResponse(
  settings.filter.frequencies,
  settings.filter.cutoff,
  settings.filter.Q,
)

export function initSynth(reduxStore) {
  settings = reduxStore.getState()
  reduxStore.subscribe(() => {
    settings = reduxStore.getState()
  })

  const filterTargetFreqs = getLogScaleFrequencySample(FILTER_GRAPH_FREQ_RESOLUTION)
  reduxStore.dispatch(updateFilterTargetFreqs(filterTargetFreqs))
  reduxStore.dispatch(updateFilterResponse(calculateFilterResponse(
    filterTargetFreqs,
    settings.filter.cutoff,
    settings.filter.Q,
  )))

  document.addEventListener('keydown', handleKeydown)
}
