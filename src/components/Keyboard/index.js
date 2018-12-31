import React from 'react'
import Key from '../Key'
import keyboardMappings from '../../synthesizer/keyboard'
import styles from './Keyboard.css'

export default function Keyboard(playingKeys) {
  console.log(playingKeys)

  return (
    <div className={styles.keyboard}>
      <div className={`${styles['key-row']} ${styles['first-row']}`}>
        <Key playing={playingKeys[keyboardMappings[81]]} open>Q</Key>
        <Key playing={playingKeys[keyboardMappings[87]]} black first>W</Key>
        <Key playing={playingKeys[keyboardMappings[69]]} black last>E</Key>
        <Key playing={playingKeys[keyboardMappings[82]]} open>R</Key>
        <Key playing={playingKeys[keyboardMappings[84]]} black first>T</Key>
        <Key playing={playingKeys[keyboardMappings[89]]} black>Y</Key>
        <Key playing={playingKeys[keyboardMappings[85]]} black last>U</Key>
        <Key playing={playingKeys[keyboardMappings[73]]} open>I</Key>
        <Key playing={playingKeys[keyboardMappings[79]]} black first>O</Key>
        <Key playing={playingKeys[keyboardMappings[80]]} black last>P</Key>
        <Key playing={playingKeys[keyboardMappings[219]]} open>[</Key>
      </div>

      <div className={`${styles['key-row']} ${styles['second-row']}`}>
        <Key playing={playingKeys[keyboardMappings[65]]} bottomOpen>A</Key>
        <Key playing={playingKeys[keyboardMappings[83]]}>S</Key>
        <Key playing={playingKeys[keyboardMappings[68]]}>D</Key>
        <Key playing={playingKeys[keyboardMappings[70]]} bottomOpen>F</Key>
        <Key playing={playingKeys[keyboardMappings[71]]}>G</Key>
        <Key playing={playingKeys[keyboardMappings[72]]}>H</Key>
        <Key playing={playingKeys[keyboardMappings[74]]}>J</Key>
        <Key playing={playingKeys[keyboardMappings[75]]} bottomOpen>K</Key>
        <Key playing={playingKeys[keyboardMappings[76]]}>L</Key>
        <Key playing={playingKeys[keyboardMappings[186]]}>;</Key>
        <Key playing={playingKeys[keyboardMappings[222]]} bottomOpen>{'\''}</Key>
      </div>
    </div>
  )
}
