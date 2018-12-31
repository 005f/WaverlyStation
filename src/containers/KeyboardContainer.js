import { connect } from 'react-redux'
import Keyboard from '../components/Keyboard'

const mapStateToProps = ({ activeKeys }) => ({ activeKeys })

export default connect(mapStateToProps)(Keyboard)
