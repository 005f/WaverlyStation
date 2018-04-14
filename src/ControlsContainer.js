import { connect } from 'react-redux'
import Controls from './Controls'
import { changeDecay } from './actions'


const mapStateToProps = state => ({ adsr: state })

const mapDispatchToProps = dispatch => ({
  changeDecay: level => dispatch(changeDecay(level)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Controls)
