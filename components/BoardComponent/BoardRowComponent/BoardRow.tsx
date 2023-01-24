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

    let countOfWords: any = {'F': 1, 'U': 1, 'Z': 2, 'Y': 1}

    useEffect(()=>{
        itemsRef.current[0].focus();      // to autofocus on first load of the page
    }, [attempts])

    function compare(currentWord: Array<string>, CORRECT_WORD: Array<string>){
        for(let i = 0; i < currentWord.length; i++){
            let temp = letterStatus
            if(currentWord[i] === CORRECT_WORD[i]){
                temp[i] = "green"
                setLetterStatus(temp)
                countOfWords[currentWord[i]] -= 1
                currentWord[i] = ""
            }
        }

        for(let i = 0; i < currentWord.length; i++){
            let temp = letterStatus
            console.log(temp)
            if(currentWord[i] !== "" && countOfWords[currentWord[i]] !== undefined && countOfWords[currentWord[i]] > 0){
                temp[i] = "yellow"
                setLetterStatus(temp)
                countOfWords[currentWord[i]] -= 1
            }else if(currentWord[i] !== "" && ((countOfWords[currentWord[i]] === undefined) || (countOfWords[currentWord[i]] === 0))){
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
            // console.log(fieldIntIndex)
            // window.addEventListener('keypress', function(event){
                
            //     if(event.keyCode !== 8){
            //         console.log("+1")
            //         itemsRef.current[fieldIntIndex + 1].focus();
            //     }else{
            //         itemsRef.current[fieldIntIndex].focus();
            //     }
            // })  
            itemsRef.current[fieldIntIndex + 1].focus();
        }
    }

    

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        compare(word, CORRECT_WORD)
        dispatch({type:"ADD-WORD", payload: word})
        dispatch({type:"ATTEMPTS", payload: rowIdx})
    }

    function backSpaceFunc(e:any){
        const [, codeFieldIndex] = e.target.name.split("-");
        let fieldIntIndex: any = parseInt(codeFieldIndex, 10);
        if(e.keyCode === 8 || e.keyCode === 37){
            if(fieldIntIndex > 0){
                console.log(fieldIntIndex)
                itemsRef.current[fieldIntIndex - 1].focus();
            }
        }
        if(e.keyCode === 39){
            if(fieldIntIndex < COLUMNS-1){
                itemsRef.current[fieldIntIndex + 1].focus();
            }
        }
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
                                onKeyUp={backSpaceFunc}
                            />
                            <button type="submit" style={{display: "none"}}>Submit</button>
                        </>
                    ))
                }
            </form>
        </div>
  )
}