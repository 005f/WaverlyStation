import React from 'react'
import { func } from 'prop-types'
import Slider from 'react-rangeslider'
import { ADSRType } from '../../types.js'
// We don't want vendor styles to be modularized
import '!style-loader!css-loader!react-rangeslider/lib/index.css'
import styles from './Controls.css'


export default function Controls({
  adsr,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
}) {
  return (
    <div className={styles['controls-group']}>
      <h2>Envelope</h2>

      <div className={styles['slider-group']}>
        <div className={styles['slider-wrapper']}>
          <Slider
            max={4}
            onChange={changeAttack}
            orientation="vertical"
            step={0.01}
            value={adsr.attackTime}
          />

          <div>Attack</div>
        </div>

        <div className={styles['slider-wrapper']}>
          <Slider
            max={4}
            onChange={changeDecay}
            orientation="vertical"
            step={0.02}
            value={adsr.decayTime}
          />

          <div>Decay</div>
        </div>

        <div className={styles['slider-wrapper']}>
          <Slider
            max={adsr.peakLevel}
            onChange={changeSustain}
            orientation="vertical"
            step={0.001}
            value={adsr.sustainLevel}
          />

          <div>Sustain</div>
        </div>

        <div className={styles['slider-wrapper']}>
          <Slider
            max={4}
            onChange={changeRelease}
            orientation="vertical"
            step={0.02}
            value={adsr.releaseTime}
          />

          <div>Release</div>
        </div>
      </div>
    </div>
  )
}

Controls.propTypes = {
  adsr: ADSRType.isRequired,
  changeAttack: func.isRequired,
  changeDecay: func.isRequired,
  changeSustain: func.isRequired,
  changeRelease: func.isRequired,
}
