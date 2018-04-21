import { connect } from 'react-redux'
import Controls from './Controls'
import {
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
} from './actions'


const mapStateToProps = state => ({ adsr: state })

const mapDispatchToProps = dispatch => ({
  changeAttack: level => dispatch(changeAttack(level)),
  changeDecay: level => dispatch(changeDecay(level)),
  changeSustain: level => dispatch(changeSustain(level)),
  changeRelease: level => dispatch(changeRelease(level)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls)
