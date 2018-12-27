// Adapted from https://noisehack.com/generate-noise-web-audio-api/

export function createWhitenoiseBuffer(ctx) {
  const bufferSize = 2 * ctx.sampleRate

  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)

  const output = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    output[i] = (
      Math.random() * 2
    ) - 1
  }

  return noiseBuffer
}

export function createWhiteNoiseNode(ctx, buffer) {
  const node = ctx.createBufferSource()
  node.buffer = buffer
  node.loop = true

  return node
}
