import logo from './logo.svg';
import './App.css';
import "./keyboardFeedback.css"
import {useEffect, useState, useRef } from "react";
import Textarea from 'react-expanding-textarea'
import React from 'react'
import { useGamepads } from 'react-gamepads'
import TextPadControls from "./pictures/textpad controls.png" 
import TextPadNumbers from "./pictures/textpad numpad.png" 
import Textpad from "./pictures/textpad.png" 

function TypeSupport(chosenLetter) {
  const [activeKey, setActiveKey] = useState("")
  const [pickedLetter, setPickedLetter] = useState(chosenLetter.chosenLetter.toLowerCase())
  //console.log(pickedLetter)
  const [highlightedLetter, setHighlightedLetter] = useState("")
  const [letterCssClass, setLetterCssClass] = useState("keyNull")

  //console.log(highlightedLetter)

  const setKeyBoardHighlight = () => {
    if (highlightedLetter !== chosenLetter.chosenLetter.toLowerCase()) {
      if (chosenLetter.chosenLetter === "" || chosenLetter.chosenLetter === undefined) {
        setLetterCssClass("keyNull")
        setHighlightedLetter(chosenLetter.chosenLetter.toLowerCase())
        //console.log(chosenLetter.chosenLetter)
        //console.log(letterCssClass)
      } else if (chosenLetter.chosenLetter === "," || chosenLetter.chosenLetter === ";") {
        setHighlightedLetter(chosenLetter.chosenLetter.toLowerCase())
        setLetterCssClass(`keyKomma`)
      } else if (chosenLetter.chosenLetter === "." || chosenLetter.chosenLetter === ":") {
        setHighlightedLetter(chosenLetter.chosenLetter.toLowerCase())
        setLetterCssClass(`keyFullstop`)
      } else {
        setHighlightedLetter(chosenLetter.chosenLetter.toLowerCase())
        setLetterCssClass(`key${chosenLetter.chosenLetter.toLowerCase()}`)
        //console.log(letterCssClass)
      } 
    } else {
      
    }
  }

  setKeyBoardHighlight();

  return (
    <div className='frameManuals'>
      <div className='contentDiv'>
        <h3>Keyboard letters</h3>
        <div className="keyboardFeedbackFrame">
          <img src={Textpad} />
          <div>
            <div className={`keyboardFeedback ${letterCssClass}`}>
            </div>
          </div>
        </div>               
      </div> 
      <div className='contentDivLR'>
        <div>
          <h3>Keyboard numbers</h3>
          <img src={TextPadNumbers} />  
        </div>
        <div>
          <h3>Legend:</h3> 
          <ul>
            <li>Yellow: accessible with stick only</li>
            <li>Blue: accessible with stick + shoulders</li>
            <li>Purple: accessible with stick + trigger</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TypeSupport;
