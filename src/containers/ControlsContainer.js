import { connect } from 'react-redux'
import Controls from '../components/Controls'
import {
  changeCents,
  changeSemitones,
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
  changeAmpLevel,
  changeWaveform,
  updateFilterCutoff,
  updateFilterQ,
} from '../actions'
import { OSC_A, OSC_B } from '../constants'


const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  changeAttack: level => dispatch(changeAttack(level)),
  changeDecay: level => dispatch(changeDecay(level)),
  changeSustain: level => dispatch(changeSustain(level)),
  changeRelease: level => dispatch(changeRelease(level)),
  changeAmpLevel: level => dispatch(changeAmpLevel(level)),
  changeOscACents: cents => dispatch(changeCents({
    id: OSC_A,
    cents,
  })),
  changeOscASemitones: semitones => dispatch(changeSemitones({
    id: OSC_A,
    semitones,
  })),
  changeOscBCents: cents => dispatch(changeCents({
    id: OSC_B,
    cents,
  })),
  changeOscBSemitones: semitones => dispatch(changeSemitones({
    id: OSC_B,
    semitones,
  })),
  changeOscAWaveform: waveform => dispatch(changeWaveform({
    id: OSC_A,
    waveform,
  })),
  changeOscBWaveform: waveform => dispatch(changeWaveform({
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
