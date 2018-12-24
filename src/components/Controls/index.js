import React from 'react'
import { func, shape } from 'prop-types'
import Slider from 'react-rangeslider'
import Filter from '../Filter'
import {
  AmplifierType,
  EnvelopeType,
  FilterType,
  OscillatorType,
  LFOType,
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
  envelope,
  filter,
  osc,
  lfo,
  changeLFOARate,
  changeLFOBRate,
  changeLFOAWaveform,
  changeLFOBWaveform,
  changeLFOASend,
  changeLFOBSend,
  changeOscACents,
  changeOscASemitones,
  changeOscBCents,
  changeOscBSemitones,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
  changeAmpLevel,
  changeCutoff,
  changeQ,
  changeOscAWaveform,
  changeOscBWaveform,
  changeOscAGain,
  changeOscBGain,
}) {
  return (
    <div className={styles['control-panel']}>
      <div className={`${styles['controls-group']} ${styles['split-group']}`}>
        <div className={styles['controls-group-section']}>

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

        <div className={styles['controls-group-section']}>
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

      <div className={styles['controls-group']}>
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

      <div className={styles['controls-group']}>
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

      <div className={styles['controls-group']}>
        <h2 className={styles['group-header']}>Amplifier</h2>

        <div className={styles['slider-group']}>
          <div className={styles['slider-wrapper']}>
            <Slider
              max={1}
              min={0}
              onChange={changeAmpLevel}
              orientation="vertical"
              step={0.05}
              value={amplifier.level}
            />
          </div>
        </div>
      </div>

      <div className={`${styles['controls-group']} ${styles['split-group']}`}>
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
  osc: shape({
    [OSC_A]: OscillatorType.isRequired,
    [OSC_B]: OscillatorType.isRequired,
  }).isRequired,
  changeAttack: func.isRequired,
  changeDecay: func.isRequired,
  changeSustain: func.isRequired,
  changeRelease: func.isRequired,
  changeAmpLevel: func.isRequired,
  changeCutoff: func.isRequired,
  changeQ: func.isRequired,
  changeLFOARate: func.isRequired,
  changeLFOBRate: func.isRequired,
  changeLFOAWaveform: func.isRequired,
  changeLFOBWaveform: func.isRequired,
  changeLFOASend: func.isRequired,
  changeLFOBSend: func.isRequired,
  changeOscAWaveform: func.isRequired,
  changeOscBWaveform: func.isRequired,
  changeOscACents: func.isRequired,
  changeOscASemitones: func.isRequired,
  changeOscBCents: func.isRequired,
  changeOscBSemitones: func.isRequired,
  changeOscAGain: func.isRequired,
  changeOscBGain: func.isRequired,
}
