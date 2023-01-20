import React from 'react'
import styles from './Keyboard.module.css'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';

function KeyboardComponent({keyboardInput}: any) {
    return (
        <div className={styles.keyboardWrapper}>
            <Keyboard 
                onKeyPress={keyboardInput} 
            />
        </div>
    )
}

export default KeyboardComponent
