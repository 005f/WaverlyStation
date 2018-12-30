import React from 'react'
import { func, shape } from 'prop-types'
import Slider from 'react-rangeslider'
import Filter from '../Filter'
import {
  AmplifierType,
  EnvelopeType,
  FilterType,
  LFOType,
  NoiseType,
  OscillatorType,
} from '../../types'

import {
  WAVEFORM_TYPE_SAW,
  WAVEFORM_TYPE_SINE,
  WAVEFORM_TYPE_SQUARE,
  WAVEFORM_TYPE_TRIANGLE,
  LFO_A,
  LFO_B,
  OSC_A,
  OSC_B,
} from '../../constants'

import styles from './Controls.css'
// We don't want vendor styles to be modularized
import '!style-loader!css-loader!react-rangeslider/lib/index.css' // eslint-disable-line

export default function Controls({
  amplifier,
  changeAmpLevel,
  changeAttack,
  changeCutoff,
  changeDecay,
  changeLFOARate,
  changeLFOASend,
  changeLFOAWaveform,
  changeLFOBRate,
  changeLFOBSend,
  changeLFOBWaveform,
  changeNoiseAmount,
  changeOscACents,
  changeOscAGain,
  changeOscASemitones,
  changeOscAWaveform,
  changeOscBCents,
  changeOscBGain,
  changeOscBSemitones,
  changeOscBWaveform,
  changeQ,
  changeRelease,
  changeSustain,
  envelope,
  filter,
  lfo,
  noise,
  osc,
}) {
  return (
    <div className={styles['control-panel']}>
      <div className={`${styles['controls-group']} ${styles['osc-group']}`}>
        <div className={`${styles['controls-group-section']} pastel-blue`}>

          <h2 className={styles['group-header']}>Oscilator A</h2>

          <div className={styles['horizontal-group']}>
            <div className={styles['vertical-group']}>
              <button onClick={() => changeOscAWaveform(WAVEFORM_TYPE_SINE)}>∿</button>
              <button onClick={() => changeOscAWaveform(WAVEFORM_TYPE_SAW)}>⊿⊿</button>
              <button onClick={() => changeOscAWaveform(WAVEFORM_TYPE_TRIANGLE)}>△</button>
              <button onClick={() => changeOscAWaveform(WAVEFORM_TYPE_SQUARE)}>⊓</button>
            </div>
            <div className={styles['slider-group']}>
              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={-100}
                  onChange={changeOscACents}
                  orientation="vertical"
                  step={1}
                  value={osc[OSC_A].cents}
                />

                <div>Fine</div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={24}
                  min={-24}
                  onChange={changeOscASemitones}
                  orientation="vertical"
                  step={1}
                  value={osc[OSC_A].semitones}
                />

                <div>Coarse</div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={1}
                  min={0}
                  onChange={changeOscAGain}
                  orientation="vertical"
                  step={0.05}
                  value={osc[OSC_A].gain}
                />

                <div>Level</div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles['controls-group-section']} pastel-red`}>
          <h2 className={styles['group-header']}>Oscilator B</h2>

          <div className={styles['horizontal-group']}>
            <div className={styles['vertical-group']}>
              <button onClick={() => changeOscBWaveform(WAVEFORM_TYPE_SINE)}>∿</button>
              <button onClick={() => changeOscBWaveform(WAVEFORM_TYPE_SAW)}>⊿⊿</button>
              <button onClick={() => changeOscBWaveform(WAVEFORM_TYPE_TRIANGLE)}>△</button>
              <button onClick={() => changeOscBWaveform(WAVEFORM_TYPE_SQUARE)}>⊓</button>
            </div>

            <div className={styles['slider-group']}>
              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={-100}
                  onChange={changeOscBCents}
                  orientation="vertical"
                  step={1}
                  value={osc[OSC_B].cents}
                />

                <div>Fine</div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={24}
                  min={-24}
                  onChange={changeOscBSemitones}
                  orientation="vertical"
                  step={1}
                  value={osc[OSC_B].semitones}
                />

                <div>Coarse</div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={1}
                  min={0}
                  onChange={changeOscBGain}
                  orientation="vertical"
                  step={0.05}
                  value={osc[OSC_B].gain}
                />

                <div>Level</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles['controls-group']} ${styles['noise-group']}`}>
        <div className={`${styles['horizontal-group']} ${styles['controls-group-section']} pastel-yellow`}>
          <h2 className={styles['group-header']}>Noise</h2>

          <div className={styles['slider-group']}>
            <div className={styles['slider-wrapper']}>
              <Slider
                max={1}
                min={0}
                onChange={changeNoiseAmount}
                orientation="vertical"
                step={0.05}
                value={noise.amount}
              />

              <div>Amount</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles['controls-group']} ${styles['filter-group']}`}>
        <div className={styles['controls-group-section']}>
          <h2 className={styles['group-header']}>Filter</h2>

          <Filter response={filter.response} />

          <div className={styles['slider-group']}>
            <div className={styles['slider-wrapper']}>
              <Slider
                max={20000}
                min={30}
                onChange={changeCutoff}
                orientation="vertical"
                step={10}
                value={filter.cutoff}
              />

              <div>Cutoff</div>
            </div>

            <div className={styles['slider-wrapper']}>
              <Slider
                max={24}
                min={0.2}
                onChange={changeQ}
                orientation="vertical"
                step={0.2}
                value={filter.Q}
              />

              <div>Resonance</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles['controls-group']} ${styles['env-group']}`}>
        <div className={styles['controls-group-section']}>
          <h2 className={styles['group-header']}>Envelope</h2>

          <div className={styles['slider-group']}>
            <div className={styles['slider-wrapper']}>
              <Slider
                max={4}
                onChange={changeAttack}
                orientation="vertical"
                step={0.01}
                value={envelope.attackTime}
              />

              <div>Attack</div>
            </div>

            <div className={styles['slider-wrapper']}>
              <Slider
                max={4}
                onChange={changeDecay}
                orientation="vertical"
                step={0.02}
                value={envelope.decayTime}
              />

              <div>Decay</div>
            </div>

            <div className={styles['slider-wrapper']}>
              <Slider
                max={1}
                onChange={changeSustain}
                orientation="vertical"
                step={0.001}
                value={envelope.sustainLevel}
              />

              <div>Sustain</div>
            </div>

            <div className={styles['slider-wrapper']}>
              <Slider
                max={4}
                onChange={changeRelease}
                orientation="vertical"
                step={0.02}
                value={envelope.releaseTime}
              />

              <div>Release</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles['controls-group']} ${styles['amp-group']}`}>
        <div className={`${styles['controls-group-section']} ${styles['amp-group']} orange`}>
          <h2 className={styles['group-header']}>Amplifier</h2>

          <div className={styles['slider-group']}>
            <div className={styles['slider-wrapper']}>
              <Slider
                max={0.5}
                min={0}
                onChange={changeAmpLevel}
                orientation="vertical"
                step={0.05}
                value={amplifier.level}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles['controls-group']} ${styles['lfo-group']} ${styles['horizontal-group']}`}>
        <div className={styles['controls-group-section']}>

          <h2 className={styles['group-header']}>LFO A</h2>

          <div className={styles['horizontal-group']}>
            <div className={styles['vertical-group']}>
              <button onClick={() => changeLFOAWaveform(WAVEFORM_TYPE_SINE)}>∿</button>
              <button onClick={() => changeLFOAWaveform(WAVEFORM_TYPE_SAW)}>⊿⊿</button>
              <button onClick={() => changeLFOAWaveform(WAVEFORM_TYPE_TRIANGLE)}>△</button>
              <button onClick={() => changeLFOAWaveform(WAVEFORM_TYPE_SQUARE)}>⊓</button>
            </div>
            <div className={styles['slider-group']}>
              <div className={styles['slider-wrapper']}>
                <Slider
                  max={20}
                  min={0.04}
                  onChange={changeLFOARate}
                  orientation="vertical"
                  step={0.02}
                  value={lfo[LFO_A].rate}
                />

                <div>Rate</div>
              </div>
            </div>

            <div className={styles['slider-group']}>
              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={0}
                  onChange={val => changeLFOASend(val, 'filterFreq')}
                  orientation="vertical"
                  step={1}
                  value={lfo[LFO_A].sends.filterFreq}
                />

                <div>Filter Freq </div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={0}
                  onChange={val => changeLFOASend(val, 'filterRes')}
                  orientation="vertical"
                  step={1}
                  value={lfo[LFO_A].sends.filterRes}
                />

                <div>Filter Resonance </div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={0}
                  onChange={val => changeLFOASend(val, 'oscAFine')}
                  orientation="vertical"
                  step={1}
                  value={lfo[LFO_A].sends.oscAFine}
                />

                <div>Osc A Pitch </div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={0}
                  onChange={val => changeLFOASend(val, 'oscBFine')}
                  orientation="vertical"
                  step={1}
                  value={lfo[LFO_A].sends.oscBFine}
                />

                <div>Osc B Pitch</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['controls-group-section']}>

          <h2 className={styles['group-header']}>LFO B</h2>

          <div className={styles['horizontal-group']}>
            <div className={styles['vertical-group']}>
              <button onClick={() => changeLFOBWaveform(WAVEFORM_TYPE_SINE)}>∿</button>
              <button onClick={() => changeLFOBWaveform(WAVEFORM_TYPE_SAW)}>⊿⊿</button>
              <button onClick={() => changeLFOBWaveform(WAVEFORM_TYPE_TRIANGLE)}>△</button>
              <button onClick={() => changeLFOBWaveform(WAVEFORM_TYPE_SQUARE)}>⊓</button>
            </div>
            <div className={styles['slider-group']}>
              <div className={styles['slider-wrapper']}>
                <Slider
                  max={20}
                  min={0.04}
                  onChange={changeLFOBRate}
                  orientation="vertical"
                  step={0.02}
                  value={lfo[LFO_B].rate}
                />

                <div>Rate</div>
              </div>
            </div>

            <div className={styles['slider-group']}>
              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={0}
                  onChange={val => changeLFOBSend(val, 'filterFreq')}
                  orientation="vertical"
                  step={1}
                  value={lfo[LFO_B].sends.filterFreq}
                />

                <div>Filter Freq </div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={0}
                  onChange={val => changeLFOBSend(val, 'filterRes')}
                  orientation="vertical"
                  step={1}
                  value={lfo[LFO_B].sends.filterRes}
                />

                <div>Filter Resonance </div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={0}
                  onChange={val => changeLFOBSend(val, 'oscAFine')}
                  orientation="vertical"
                  step={1}
                  value={lfo[LFO_B].sends.oscAFine}
                />

                <div>Osc A Pitch </div>
              </div>

              <div className={styles['slider-wrapper']}>
                <Slider
                  max={100}
                  min={0}
                  onChange={val => changeLFOBSend(val, 'oscBFine')}
                  orientation="vertical"
                  step={1}
                  value={lfo[LFO_B].sends.oscBFine}
                />

                <div>Osc B Pitch </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Controls.propTypes = {
  amplifier: AmplifierType.isRequired,
  envelope: EnvelopeType.isRequired,
  filter: FilterType.isRequired,
  lfo: shape({
    [LFO_A]: LFOType.isRequired,
    [LFO_B]: LFOType.isRequired,
  }).isRequired,
  noise: NoiseType.isRequired,
  osc: shape({
    [OSC_A]: OscillatorType.isRequired,
    [OSC_B]: OscillatorType.isRequired,
  }).isRequired,
  changeAmpLevel: func.isRequired,
  changeAttack: func.isRequired,
  changeCutoff: func.isRequired,
  changeDecay: func.isRequired,
  changeLFOARate: func.isRequired,
  changeLFOASend: func.isRequired,
  changeLFOAWaveform: func.isRequired,
  changeLFOBRate: func.isRequired,
  changeLFOBSend: func.isRequired,
  changeLFOBWaveform: func.isRequired,
  changeNoiseAmount: func.isRequired,
  changeOscACents: func.isRequired,
  changeOscAGain: func.isRequired,
  changeOscASemitones: func.isRequired,
  changeOscAWaveform: func.isRequired,
  changeOscBCents: func.isRequired,
  changeOscBGain: func.isRequired,
  changeOscBSemitones: func.isRequired,
  changeOscBWaveform: func.isRequired,
  changeQ: func.isRequired,
  changeRelease: func.isRequired,
  changeSustain: func.isRequired,
}
