import React from 'react'
import Key from '../Key'

import styles from './Keyboard.css'

export default function Keyboard() {
  return (
    <div className={styles.keyboard}>
      <div className={`${styles['key-row']} ${styles['first-row']}`}>
        <Key open>Q</Key>
        <Key black first>W</Key>
        <Key black last>E</Key>
        <Key open>R</Key>
        <Key black first>T</Key>
        <Key black>Y</Key>
        <Key black last>U</Key>
        <Key open>I</Key>
        <Key black first>O</Key>
        <Key black last>P</Key>
        <Key open>[</Key>
      </div>

      <div className={`${styles['key-row']} ${styles['second-row']}`}>
        <Key bottomOpen>A</Key>
        <Key>S</Key>
        <Key>D</Key>
        <Key bottomOpen>F</Key>
        <Key>G</Key>
        <Key>H</Key>
        <Key>J</Key>
        <Key bottomOpen>K</Key>
        <Key>L</Key>
        <Key>;</Key>
        <Key bottomOpen>{'\''}</Key>
      </div>
    </div>
  )
}
