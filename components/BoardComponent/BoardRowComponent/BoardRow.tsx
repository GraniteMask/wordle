import { WordleContext } from '@/pages/_app';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { COLUMNS } from "../../../constants/GridConstants"
import styles from "./BoardRow.module.css";

const CORRECT_WORD = ['F','U','Z','Z','Y']

interface Row {
    rowIdx: number,
    onScreenInput: string
}

const stylesMap = {
    "green": styles.greenBoxes,
    "yellow": styles.yellowBoxes,
    "absent": styles.absentBoxes
}

export default function BoardRow({ rowIdx, onScreenInput } : Row) : JSX.Element {
    const {state, dispatch} = useContext(WordleContext)
    const attempts = state?.attempts
    const [word, setWord] = useState<Array<string>>([])                             // current word set
    const [displayLetter, setDisplayLetter] = useState<string>('')
    const [letterStatus, setLetterStatus] = useState<(keyof typeof stylesMap)[]>(Array(COLUMNS).fill(""))   
    const itemsRef = useRef<Array<any>>([]);

    useEffect(()=>{
        itemsRef.current[0].focus();      // to autofocus on first load of the page
    }, [attempts])

    function compare(currentWord: Array<String>, CORRECT_WORD: Array<String>){
        let CORRECT_WORD_TEMP = CORRECT_WORD
        for(let i = 0; i < currentWord.length; i++){
            let temp = letterStatus
            if(currentWord[i] === CORRECT_WORD_TEMP[i]){
                temp[i] = "green"
                setLetterStatus(temp)
            }else if(CORRECT_WORD_TEMP.includes(currentWord[i])){
                temp[i] = "yellow"
                setLetterStatus(temp)
            }else if(!CORRECT_WORD_TEMP.includes(currentWord[i])){
                temp[i] = "absent"
                setLetterStatus(temp)
            }
        }
    }

    const handleInput = (e: any, colIdx: number) => {
        setDisplayLetter(e.target.value)
        let tempWord: Array<string> = word
        tempWord[colIdx] = e.target.value.toUpperCase()
        setWord(tempWord)
        
        // For changing focus
        const [, codeFieldIndex] = e.target.name.split("-");
        let fieldIntIndex: any = parseInt(codeFieldIndex, 10);

        if(fieldIntIndex < COLUMNS-1){
            console.log(fieldIntIndex)
            itemsRef.current[fieldIntIndex + 1].focus();
        }
            // itemsRef.current = []
    }


    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        compare(word, CORRECT_WORD)
        dispatch({type:"ADD-WORD", payload: word})
        dispatch({type:"ATTEMPTS", payload: rowIdx})
    }


    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.boxesWrapper}>
                {
                    [...Array(COLUMNS)].map((cols, colIdx)=>(
                        <>
                            <input 
                                // className={
                                //     `${styles[`${letterStatus[colIdx] != "" ? letterStatus[colIdx] : "default"}Boxes`]} ${styles.boxesBasicDesign}`
                                // }
                                className={`${styles.boxesBasicDesign} ${stylesMap[letterStatus[colIdx]] ?? styles.defaultBoxes}`}
                                type="text" 
                                maxLength={1}
                                ref={(ref) => itemsRef.current.push(ref)}
                                key={colIdx} 
                                onChange={(e)=>handleInput(e, colIdx)} 
                                disabled = {attempts === rowIdx || attempts < (rowIdx - 1) ? true : false}
                                name={`code-${colIdx}`}
                            />
                            <button type="submit" style={{display: "none"}}>Submit</button>
                        </>
                    ))
                }
            </form>
        </div>
  )
}