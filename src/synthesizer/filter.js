import Complex from 'Complex'
import {
  FILTER_GRAPH_FREQ_RESOLUTION,
  FREQ_LOWER_BOUND,
  FREQ_UPPER_BOUND,
  NUM_OCTAVES,
} from '../constants'

export function createFilter(ctx, type, cutoff, Q) {
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = cutoff
  filter.Q.value = Q

  return filter
}

export function updateFilter(ctx, filter, type, cutoff, Q) {
  filter.frequency.setValueAtTime(cutoff, ctx.currentTime)
  filter.Q.setValueAtTime(Q, ctx.currentTime)
}

export function getLogFilterResponse(cutoff, Q) {
  const targetFreqs = []
  for (var i = 1; i <= 20000; i++) {
    targetFreqs.push(i)
  };
  //const targetFreqs = getLogScaleFrequencySample(FILTER_GRAPH_FREQ_RESOLUTION)

  return calculateFilterResponse(targetFreqs, cutoff, Q)
}

/*
 * Creates a log scale sample of the frequencies in the human audible spectrum of 20hz-20,000hz.
 *
 * @param {number} resolution - The amount of frequencies we want our sample to contain
 *
 * @return {array} targetFreqs - An array containing numbers representing the sampled
 *                                frequencies in Hz.
 */
function getLogScaleFrequencySample(resolution) {
  const targetFreqs = []

  for (let i = 0; i < FILTER_GRAPH_FREQ_RESOLUTION; i++) {
    const normalizedIndex = i / (FILTER_GRAPH_FREQ_RESOLUTION - 1)

    targetFreqs[i] =
      FREQ_LOWER_BOUND * ((FREQ_UPPER_BOUND / FREQ_LOWER_BOUND) ** normalizedIndex)
  }

  return targetFreqs
}

/*
 * Compute the filter response for a given type, target frequency,
 * and quality factor.
 * See the Web Audio spec for more info:
 * https://www.w3.org/TR/webaudio/#the-biquadfilternode-interface
 *
 * @param {array} freqs - The amount of frequencies we want our sample to contain
 * @param {number} targetFreq - The 'target' frequency of the filter.
 *                              Can represent different things based on filter type.
 * @param {number} Q - Quality factor. Can represent different things depending on
 *                     filter type.
 *
 * @return {array} - An array of response magnitudes derived from the given frequencies
 */
function calculateFilterResponse(freqs, targetFreq, Q) {
  const coeffs = calculateFilterCoefficients(targetFreq, Q)

  return calculateFrequencyResponses(coeffs, freqs)
}

/*
 * Calculates filter transfer function coefficients based on
 * a given cutoff frequency and resonance.
 * Implementation based on the webkit source: https://git.io/vheq0
 *
 * @param {number} cutoff - The frequency at which the signal has been attenuated by 3 db
 * @param {number} resonance - A boost amount, in db, that is applied at the cutoff frequency
 *
 * @return {object} - An object containing the coefficients
 */ 
function calculateLowpassFilterCoefficients(cutoff, resonance) {
  const normCutoff = cutoff / window.SAMPLE_RATE

  const g = 10 ** (0.05 * resonance)
  const d = Math.sqrt((4 - Math.sqrt(16 - 16 / (g * g))) / 2)

  const theta = Math.PI * normCutoff
  const sn = 0.5 * d * Math.sin(theta)
  const beta = 0.5 * (1 - sn) / (1 + sn)
  const gamma = (0.5 + beta) * Math.cos(theta)
  const alpha = 0.25 * (0.5 + beta - gamma)

  return {
    b0: 2 * alpha,
    b1: 2 * 2 * alpha,
    b2: 2 * alpha,
    a0: 1,
    a1: 2 * -1 * gamma,
    a2: 2 * beta,
  }
}

/*
 * Calculates filter coefficients based on filter type, target frequency,
 * and Q factor. Normalizes the coefficients so that a0 = 1
 *
 * @return {object} - An object containing the normalized coefficients
 */ 
function calculateFilterCoefficients(targetFreq, Q) {
  const coeffs = calculateLowpassFilterCoefficients(targetFreq, Q)

  const a0Inverse = 1 / coeffs.a0;
    
  return {
    b0: coeffs.b0 * a0Inverse,
    b1: coeffs.b1 * a0Inverse,
    b2: coeffs.b2 * a0Inverse,
    a1: coeffs.a1 * a0Inverse,
    a2: coeffs.a2 * a0Inverse,
  }
}

/*
 * Applies a transfer function to calculate the frequency response for an array of frequencies.
 * Implementation based on the webkit source: https://git.io/vheq0
 *
 * Note: Filter response currently represents a 2-pole filter with 12db/octave roll-off.
 * This does not accurately represent a set of chained filters with greater roll-off
 * @param {object} coeffs - An object containing the coefficients used by the
 *                          filter transfer function.
 */
function calculateFrequencyResponses(coeffs, freqs) {
   return freqs.map((freq) => {
    const omega = -1 * Math.PI * (freq / window.SAMPLE_RATE)

    const z = new Complex(Math.cos(omega), Math.sin(omega))
    const z1 = z.clone()
    const z2 = z.clone()
    const z3 = z.clone()

    z.multiply((z1.multiply(coeffs.b2).add(coeffs.b1))).add(coeffs.b0)
    z2.multiply(coeffs.a2).add(coeffs.a1).multiply(z3).add(1)

    return z.divide(z2).abs()
  })
}
