import ADSREnvelope from "adsr-envelope";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const ctx = new AudioContext();

let env = new ADSREnvelope();

let filter;
let gain;
let osc;
let startTime;

let keylocked = false;

function startPlay() {

  startTime = 0;

  // Oscillator
  osc = ctx.createOscillator();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);

  osc.onended = () => {
    osc.disconnect();
    gain.disconnect();
  }

  // Filter
  filter = ctx.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.value = 500;
  filter.Q.value = 20;

  gain = ctx.createGain();

  // Connect
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('keyup', handleKeyup);
}

const handleKeydown = () => {
  if (!keylocked) {
    startTime = ctx.currentTime;

    env.gateTime = Infinity;
    env.applyTo(gain.gain, startTime);
    osc.start(startTime);

    keylocked = true;
  }
};

const handleKeyup = () => {
  keylocked = false;
  gain.gain.cancelScheduledValues(startTime);
  env.gateTime = ctx.currentTime - startTime;
  env.applyTo(gain.gain, startTime);
  osc.stop(startTime + env.duration);

  document.removeEventListener('keydown', handleKeydown);
  document.removeEventListener('keyup', handleKeyup);

  startPlay();
}

startPlay();
