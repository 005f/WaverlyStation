import { connect } from 'react-redux'
import Controls from '../components/Controls'
import {
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
  changeAmplitude,
} from '../actions'


const mapStateToProps = state => ({ envelope: state })

const mapDispatchToProps = dispatch => ({
  changeAttack: level => dispatch(changeAttack(level)),
  changeDecay: level => dispatch(changeDecay(level)),
  changeSustain: level => dispatch(changeSustain(level)),
  changeRelease: level => dispatch(changeRelease(level)),
  changeAmplitude: level => dispatch(changeAmplitude(level)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls)
