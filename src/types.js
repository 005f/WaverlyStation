import { number, shape, string } from 'prop-types'

export const EnvelopeType = shape({
  attackTime: number.isRequired,
  decayTime: number.isRequired,
  sustainLevel: number.isRequired,
  releaseTime: number.isRequired,
  peakLevel: number.isRequired,
})

export const FilterType = shape({
  cutoff: number.isRequired,
  Q: number.isRequired,
  response: shape({}).isRequired,
})

export const AmplifierType = shape({ level: number.isRequired })

export const LFOType = shape({
  rate: number.isRequired,
})

export const NoiseType = shape({ amount: number.isRequired })

export const OscillatorType = shape({
  waveform: string.isRequired,
  cents: number.isRequired,
  semitones: number.isRequired,
  gain: number.isRequired,
})
