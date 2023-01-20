import React, { useContext, useEffect, useState } from 'react'
import styles from "./Board.module.css";
import { ROWS } from "../../constants/GridConstants"
import BoardRow from './BoardRowComponent/BoardRow';
import { WordleContext } from '@/pages/_app';
import KeyboardComponent from '../KeyboardComponent/KeyboardComponent';
import axios from 'axios'

const letterRegex = /^[A-Za-z]+$/

function Board() {
  const {state, dispatch} = useContext(WordleContext)

  const [onScreenInput, setOnScreenInput] = useState<string>('')

  const keyboardInput = (input: any) =>{
    if(!input.match(letterRegex)){
      alert('Enter a number')
    }else{
      setOnScreenInput(input)
    }
  }

  // useEffect(()=>{
  //   async function wordFetch(){
  //     const words = await axios.get('https://random-word-api.herokuapp.com/word?length=5')
  //   }

  //   wordFetch()
    
  // },[])

  return (
    <>
      <div className={styles.wrapper}>
        {
          [...Array(ROWS)].map((rows, rowIdx)=>(
            <BoardRow key={rowIdx} rowIdx={rowIdx} onScreenInput={onScreenInput}/>
          ))
        }
      </div>
      <KeyboardComponent keyboardInput={keyboardInput} />
    </>
  )
}

export default Board

// const words = await axios.get('https://random-word-api.herokuapp.com/word?length=5')