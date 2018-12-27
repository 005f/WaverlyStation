import { connect } from 'react-redux'
import Controls from '../components/Controls'
import {
  changeAmpLevel,
  changeAttack,
  changeCents,
  changeDecay,
  changeLFORate,
  changeLFOSend,
  changeLFOWaveform,
  changeNoiseAmount,
  changeOscGain,
  changeOscWaveform,
  changeRelease,
  changeSemitones,
  changeSustain,
  updateFilterCutoff,
  updateFilterQ,
} from '../actions'
import { OSC_A, OSC_B, LFO_A, LFO_B } from '../constants'


const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  changeAttack: level => dispatch(changeAttack(level)),
  changeDecay: level => dispatch(changeDecay(level)),
  changeSustain: level => dispatch(changeSustain(level)),
  changeRelease: level => dispatch(changeRelease(level)),
  changeAmpLevel: level => dispatch(changeAmpLevel(level)),
  changeLFOARate: rate => dispatch(changeLFORate({
    id: LFO_A,
    rate,
  })),
  changeLFOBRate: rate => dispatch(changeLFORate({
    id: LFO_B,
    rate,
  })),
  changeLFOAWaveform: waveform => dispatch(changeLFOWaveform({
    id: LFO_A,
    waveform,
  })),
  changeLFOBWaveform: waveform => dispatch(changeLFOWaveform({
    id: LFO_B,
    waveform,
  })),
  changeLFOASend: (value, destination) => dispatch(changeLFOSend({
    id: LFO_A,
    sends: {
      [destination]: value,
    },
  })),
  changeLFOBSend: (value, destination) => dispatch(changeLFOSend({
    id: LFO_B,
    sends: {
      [destination]: value,
    },
  })),
  changeNoiseAmount: amount => dispatch(changeNoiseAmount(amount)),
  changeOscACents: cents => dispatch(changeCents({
    id: OSC_A,
    cents,
  })),
  changeOscASemitones: semitones => dispatch(changeSemitones({
    id: OSC_A,
    semitones,
  })),
  changeOscAGain: gain => dispatch(changeOscGain({
    id: OSC_A,
    gain,
  })),
  changeOscBCents: cents => dispatch(changeCents({
    id: OSC_B,
    cents,
  })),
  changeOscBSemitones: semitones => dispatch(changeSemitones({
    id: OSC_B,
    semitones,
  })),
  changeOscBGain: gain => dispatch(changeOscGain({
    id: OSC_B,
    gain,
  })),
  changeOscAWaveform: waveform => dispatch(changeOscWaveform({
    id: OSC_A,
    waveform,
  })),
  changeOscBWaveform: waveform => dispatch(changeOscWaveform({
    id: OSC_B,
    waveform,
  })),
  changeCutoff: level => updateFilterCutoff(level),
  changeQ: level => updateFilterQ(level),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls)
