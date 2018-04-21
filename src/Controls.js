import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'


export default function Controls({
  adsr,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
}) {
  return (
    <div>
      <Slider
        max={10}
        onChange={changeAttack}
        orientation="vertical"
        step={0.01}
        value={adsr.attackTime}
      />

      <Slider
        max={10}
        onChange={changeDecay}
        orientation="vertical"
        step={0.02}
        value={adsr.decayTime}
      />

      <Slider
        max={10}
        onChange={changeSustain}
        orientation="vertical"
        step={0.02}
        value={adsr.sustainLevel}
      />

      <Slider
        max={10}
        onChange={changeRelease}
        orientation="vertical"
        step={0.02}
        value={adsr.releaseTime}
      />
    </div>
  )
}

Controls.propTypes = {
  adsr: PropTypes.shape({
    attackTime: PropTypes.number.isRequired,
    decayTime: PropTypes.number.isRequired,
    sustainLevel: PropTypes.number.isRequired,
    releaseTime: PropTypes.number.isRequired,
  }).isRequired,
  changeAttack: PropTypes.func.isRequired,
  changeDecay: PropTypes.func.isRequired,
  changeSustain: PropTypes.func.isRequired,
  changeRelease: PropTypes.func.isRequired,
}
