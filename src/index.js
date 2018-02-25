import AdsrGain from 'adsr-gain-node';

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const ctx = new AudioContext();

const osc = ctx.createOscillator();

osc.type = 'sine';
osc.frequency.setValueAtTime(440, ctx.currentTime);

const adsrNodeCreator = new AdsrGain(ctx, {
  initGain: 0.1,
  maxGain: 0.4,
  attackTime: 0.1,
  sustainTime: 0.2,
  releaseTime: 0.5,
});
const triggerTime = 0;

const env = adsrNodeCreator.getGainNode(triggerTime);

osc.connect(env);
env.connect(ctx.destination);

osc.start();
