export function connectToMulti(sourceNode, ...targetNodes) {
  return targetNodes.map(node => sourceNode.connect(node))
}

export const semitonesAsCents = semitones => semitones * 100

export function createGainNodeForNode(ctx, node, level) {
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(level, ctx.currentTime)

  node.connect(gain)

  return gain
}

export function randomIndex(array) {
  return Math.round(Math.random() * array.length)
}
