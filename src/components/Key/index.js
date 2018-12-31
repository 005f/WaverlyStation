import React from 'react'
import { node, bool } from 'prop-types'

import styles from './Key.css'

export default function Key({
  black,
  bottomOpen,
  children,
  first,
  last,
  open,
  playing,
}) {
  return (
    <div
      className={`
        ${styles.key}
        ${open && styles.open}
        ${black && styles.black}
        ${last && styles['last-black']}
        ${first && styles['first-black']}
        ${bottomOpen && styles['open-bottom']}
        ${playing && styles.playing}
      `}
    >
      {children}
    </div>
  )
}

Key.defaultProps = {
  black: false,
  bottomOpen: false,
  first: false,
  last: false,
  open: false,
  playing: false,
}

Key.propTypes = {
  black: bool,
  bottomOpen: bool,
  children: node.isRequired,
  first: bool,
  last: bool,
  open: bool,
  playing: bool,
}
