export function connectToMulti(sourceNode, ...targetNodes) {
  return targetNodes.map(node => sourceNode.connect(node))
}

export const semitonesAsCents = semitones => semitones * 100
