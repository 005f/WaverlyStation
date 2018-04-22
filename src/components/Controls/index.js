import React from 'react'
import { func } from 'prop-types'
import Slider from 'react-rangeslider'
import { EnvelopeType } from '../../types.js'
// We don't want vendor styles to be modularized
import '!style-loader!css-loader!react-rangeslider/lib/index.css'
import styles from './Controls.css'


export default function Controls({
  envelope,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
  changeAmplitude,
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
              max={0.06}
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
        <h2 className={styles['group-header']}>Amplitude</h2>

        <div className={styles['slider-group']}>
          <div className={styles['slider-wrapper']}>
            <Slider
              max={0.12}
              min={0.06}
              onChange={changeAmplitude}
              orientation="vertical"
              step={0.005}
              value={envelope.peakLevel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

Controls.propTypes = {
  envelope: EnvelopeType.isRequired,
  changeAttack: func.isRequired,
  changeDecay: func.isRequired,
  changeSustain: func.isRequired,
  changeRelease: func.isRequired,
}
