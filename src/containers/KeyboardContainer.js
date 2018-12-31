import { connect } from 'react-redux'
import Keyboard from '../components/Keyboard'

const mapStateToProps = ({ keys }) => (keys.playing)

export default connect(mapStateToProps)(Keyboard)
