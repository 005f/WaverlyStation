import octaves from './notes'

/* eslint-disable no-multi-spaces */
/* eslint-disable dot-notation */
const keyboardMappings = {
  81: octaves[4]['C'],   // Q
  65: octaves[4]['C'],   // A
  87: octaves[4]['C#'],  // W
  83: octaves[4]['D'],   // S
  69: octaves[4]['D#'],  // E
  68: octaves[4]['E'],   // D
  82: octaves[4]['F'],   // R
  70: octaves[4]['F'],   // F
  84: octaves[4]['F#'],  // T
  71: octaves[4]['G'],   // G
  89: octaves[4]['G#'],  // Y
  72: octaves[4]['A'],   // H
  85: octaves[4]['A#'],  // U
  74: octaves[4]['B'],   // J
  73: octaves[5]['C'],   // I
  75: octaves[5]['C'],   // K
  79: octaves[5]['C#'],  // O
  76: octaves[5]['D'],   // L
  80: octaves[5]['D#'],  // P
  186: octaves[5]['E'],  // ;
  219: octaves[5]['E#'], // [
  222: octaves[5]['F'],  // '
}
/* eslint-enable no-multi-spaces */
/* eslint-enable dot-notation */

export default keyboardMappings
