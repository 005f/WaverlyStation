import { connect } from 'react-redux'
import Controls from '../components/Controls'
import {
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
  changeAmpLevel,
  changeWaveform,
  updateFilterCutoff,
  updateFilterQ,
} from '../actions'


const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  changeAttack: level => dispatch(changeAttack(level)),
  changeDecay: level => dispatch(changeDecay(level)),
  changeSustain: level => dispatch(changeSustain(level)),
  changeRelease: level => dispatch(changeRelease(level)),
  changeAmpLevel: level => dispatch(changeAmpLevel(level)),
  changeWaveform: waveform => dispatch(changeWaveform(waveform)),
  changeCutoff: level => updateFilterCutoff(level),
  changeQ: level => updateFilterQ(level),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls)
