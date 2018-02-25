window.AudioContext = window.AudioContext || window.webkitAudioContext;

const ctx = new AudioContext();

const osc = ctx.createOscillator();
const gainNode = ctx.createGain();

osc.connect(gainNode);
gainNode.connect(ctx.destination);


osc.type = 'sine';
osc.frequency.setValueAtTime(440, ctx.currentTime);
osc.start();


var maxVol = 0.02;
gainNode.gain.value = initialVol;