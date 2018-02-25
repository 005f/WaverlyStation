import AdsrGain from 'adsr-gain-node';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const ctx = new AudioContext();


// Oscillator
const osc = ctx.createOscillator();

osc.type = 'sine';
osc.frequency.setValueAtTime(440, ctx.currentTime);


// Filter
const filter = ctx.createBiquadFilter();

filter.type = filter.LOWPASS;
filter.frequency.value = 2500;
filter.Q.value = 10;


// Envelope
const adsrNodeCreator = new AdsrGain(ctx, {
  initGain: 0.1,
  maxGain: 0.4,
  attackTime: 0.1,
  sustainTime: 0.2,
  releaseTime: 0.5,
});
const triggerTime = 0;
const env = adsrNodeCreator.getGainNode(triggerTime);


// Connect
osc.connect(filter);
filter.connect(env);
env.connect(ctx.destination);

osc.start();
