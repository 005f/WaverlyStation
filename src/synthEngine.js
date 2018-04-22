import ADSREnvelope from 'adsr-envelope'

window.AudioContext = window.AudioContext || window.webkitAudioContext

const ctx = new AudioContext()

const lockedKeys = {}

let settings = {}

function playNote(note) {
  const osc = ctx.createOscillator()
  osc.type = 'sine'
  // Temporary, crude simulation of actual notes
  osc.frequency.setValueAtTime(note * 10, ctx.currentTime)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 500
  filter.Q.value = 20

  const env = new ADSREnvelope({
    decayTime: settings.envelope.decayTime,
    decayCurve: settings.envelope.decayCurve,
    sustainLevel: settings.envelope.sustainLevel,
    releaseTime: settings.envelope.releaseTime,
    peakLevel: settings.envelope.peakLevel,
  })
  env.gateTime = Infinity
  const gain = ctx.createGain()
  env.applyTo(gain.gain, ctx.currentTime)

  osc.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  osc.start(ctx.currentTime)

  const startTime = ctx.currentTime

  const releaseNote = () => {
    gain.gain.cancelScheduledValues(startTime)
    env.gateTime = ctx.currentTime - startTime
    env.applyTo(gain.gain, startTime)

    osc.stop(startTime + env.duration)

    lockedKeys[note] = false
  }

  document.addEventListener('keyup', releaseNote)

  // Clean up after note is finished playing
  osc.onended = () => {
    document.removeEventListener('keyup', releaseNote)
    osc.disconnect()
    gain.disconnect()
  }
}

const handleKeydown = (e) => {
  // keydown event fires multiple times so we only handle the first event
  if (!lockedKeys[e.keyCode]) {
    lockedKeys[e.keyCode] = true

    playNote(e.keyCode)
  }
}

export default function initSynth(store) {
  settings.envelope = store.getState()
  store.subscribe(() => settings.envelope = store.getState())

  document.addEventListener('keydown', handleKeydown)
}
