import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'


export default function Controls({ adsr, changeDecay }) {
  return (
    <Slider
      max={10}
      onChange={changeDecay}
      orientation="vertical"
      step={0.02}
      value={adsr.decayTime}
    />)
}

Controls.propTypes = {
  adsr: PropTypes.shape({
    decayTime: PropTypes.number.isRequired,
  }).isRequired,
  changeDecay: PropTypes.func.isRequired,
}
