import { connect } from 'react-redux'
import Controls from '../components/Controls'
import {
  changeAttack,
  changeDecay,
  changeSustain,
  changeRelease,
  changeAmpLevel,
  changeCutoff,
  changeQ,
} from '../actions'


const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
  changeAttack: level => dispatch(changeAttack(level)),
  changeDecay: level => dispatch(changeDecay(level)),
  changeSustain: level => dispatch(changeSustain(level)),
  changeRelease: level => dispatch(changeRelease(level)),
  changeAmpLevel: level => dispatch(changeAmpLevel(level)),
  changeCutoff: level => dispatch(changeCutoff(level)),
  changeQ: level => dispatch(changeQ(level)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls)
