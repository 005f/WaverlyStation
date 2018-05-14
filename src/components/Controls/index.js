import React from 'react'
import { func } from 'prop-types'
import Slider from 'react-rangeslider'
import Filter from '../Filter'
import { AmplifierType, EnvelopeType, FilterType } from '../../types'

import styles from './Controls.css'
// We don't want vendor styles to be modularized
import '!style-loader!css-loader!react-rangeslider/lib/index.css' // eslint-disable-line

export default function Controls({
  amplifier,
  envelope,
  filter,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
  changeAmpLevel,
  changeCutoff,
  changeQ,
}) {
  return (
    <div className={styles['control-panel']}>
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
              max={envelope.peakLevel}
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
              step={0.1}
              value={amplifier.level}
            />
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
  changeAttack: func.isRequired,
  changeDecay: func.isRequired,
  changeSustain: func.isRequired,
  changeRelease: func.isRequired,
  changeAmpLevel: func.isRequired,
  changeCutoff: func.isRequired,
  changeQ: func.isRequired,
}
