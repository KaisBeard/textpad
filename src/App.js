import logo from './logo.svg';
import './App.css';
import "./keyboardFeedback.css";
import {useEffect, useState, useRef, useMemo } from "react";
import Textarea from 'react-expanding-textarea'
import React from 'react'
import { useGamepads } from 'react-gamepads'
import Manuals from "./Manuals.js"
import TypeSupport from "./TypeSupport"
import Collapsible from 'react-collapsible';

function App() {
  const [gamepads, setGamepads] = useState({});
  useGamepads(gamepads => setGamepads(gamepads));

  const [text, setText] = useState("")
  const textareaRef = useRef(null); 
  const [cursor, setCursor] = useState(0)
  const [keyboardFocus, setKeyboardFocus] = useState("noCaps") //noCaps, caps, caps1, figs, figs1, nums, nums1

  //const cursorPosition = 0;
  const [chosenLetter, setChosenLetter] = useState("")
  const [isShoulderOrTriggerPushed, SetIsShoulderOrTriggerPushed] = useState(false)

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function addStr(str, index, stringToAdd){
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
  }

  //Don't react unless gamepad connected
  if (gamepads[0] === undefined){console.log("no gamepad")} else {
  
    //Space
    if (gamepads[0].buttons[10].pressed === true ) {
      const position = textareaRef.current.selectionEnd
      delay(250).then(() => { 
        setText(addStr(text, position, " "))
        setCursor(cursor+1)})
    } 

    //Backspace
    if (gamepads[0].buttons[11].pressed === true) {
      const position = textareaRef.current.selectionEnd
      delay(250).then(() => {
      setText(text.slice(0, position-1)+text.slice(position))
      setCursor(cursor-1)})
    } 

    //fix bug with two many rerenders when more than one axis is activated
    const checKTwoAxisActivated = () => {
      if ((gamepads[0].axes[0] < - 0.6 && 
            (gamepads[0].axes[1] < - 0.6 || gamepads[0].axes[1] > 0.6 || gamepads[0].axes[2] < - 0.6 || gamepads[0].axes[2] > 0.6 || gamepads[0].axes[3] < - 0.6 || gamepads[0].axes[3] > 0.6)) ||
          (gamepads[0].axes[0] > 0.6 && 
            (gamepads[0].axes[1] < - 0.6 || gamepads[0].axes[1] > 0.6 || gamepads[0].axes[2] < - 0.6 || gamepads[0].axes[2] > 0.6 || gamepads[0].axes[3] < - 0.6 || gamepads[0].axes[3] > 0.6)) ||
          (gamepads[0].axes[2] < - 0.6 && 
            (gamepads[0].axes[1] < - 0.6 || gamepads[0].axes[1] > 0.6 || gamepads[0].axes[3] < - 0.6 || gamepads[0].axes[3] > 0.6)) ||
          (gamepads[0].axes[2] > 0.6 && 
            (gamepads[0].axes[1] < - 0.6 || gamepads[0].axes[1] > 0.6 || gamepads[0].axes[3] < - 0.6 || gamepads[0].axes[3] > 0.6)) ||
            (gamepads[0].axes[3] < - 0.6 && 
              (gamepads[0].axes[1] < - 0.6 || gamepads[0].axes[1] > 0.6 )) ||
            (gamepads[0].axes[3] > 0.6 && 
              (gamepads[0].axes[1] < - 0.6 || gamepads[0].axes[1] > 0.6 ))
        ) {return true}
    }

    //translate the position of the axe into up, down, left, right 
    const determineAxeDirection = (axe) => {
      if (checKTwoAxisActivated()=== true) {return ""} else {
      if ((axe === 0 || axe === 2) && gamepads[0].axes[axe] < - 0.6) {return "left"}
      else if ((axe === 0 || axe === 2) && gamepads[0].axes[axe] > 0.6) {return "right"}
      else if ((axe === 1 || axe === 3) && gamepads[0].axes[axe] < - 0.6) {return "up"}
      else if ((axe === 1 || axe === 3) && gamepads[0].axes[axe] > 0.6) {return "down"}
      else {return ""}}
    }

    //Choose letter dependant on axis when shoulders or triggers are involved
    const chooseOuterLetter = (button, letter) => {
      if (gamepads[0].buttons[button].pressed === true) {
        if (chosenLetter !== letter) {
          setChosenLetter(letter)
          //console.log(chosenLetter)
        }
      }
    }

    //Check if any shoulders or triggers are pushed
    const checkIsShoulderOrTriggerPushed = () => {
      if (gamepads[0].buttons[4].pressed === false &&
          gamepads[0].buttons[5].pressed === false &&
          gamepads[0].buttons[6].pressed === false &&
          gamepads[0].buttons[7].pressed === false
          ) {
        if (isShoulderOrTriggerPushed !== false) 
        {delay(300).then(() => {SetIsShoulderOrTriggerPushed(false)})}    
        //console.log("pushed2? "+ isShoulderOrTriggerPushed)
        } 
      else {
        if (isShoulderOrTriggerPushed !== true) 
          {SetIsShoulderOrTriggerPushed(true)}
        //console.log("pushed? "+ isShoulderOrTriggerPushed)
      } 
    }

    checkIsShoulderOrTriggerPushed();
    //somehow right stick doesnt work properly
    //newSystem
    const chooseLetter = (axe, direction, letter, letterLS, letterRS, letterLT, letterRT) => {
      if ( direction === determineAxeDirection(axe) ){ 
        if (chosenLetter !== letter && isShoulderOrTriggerPushed === false ) {
          setChosenLetter(letter)
          //console.log(chosenLetter)
        }
        chooseOuterLetter(4, letterLS)
        chooseOuterLetter(5, letterRS)
        chooseOuterLetter(6, letterLT)
        chooseOuterLetter(7, letterRT)
      }
    }

    const commitLetter = async (axe, axe2, axe3, axe4) => {
      const position = textareaRef.current.selectionEnd
      if (gamepads[0].axes[axe] < 0.25 && 
        gamepads[0].axes[axe] > -0.25 && 
        gamepads[0].axes[axe2] < 0.25 && 
        gamepads[0].axes[axe2] > -0.25 &&
        gamepads[0].axes[axe3] < 0.25 && 
        gamepads[0].axes[axe3] > -0.25 && 
        gamepads[0].axes[axe4] < 0.25 && 
        gamepads[0].axes[axe4] > -0.25 &&  
        chosenLetter !== "" &&
        chosenLetter !== undefined) {
          setText(addStr(text, position, chosenLetter))
          setCursor(cursor+1) 
          setChosenLetter("")
          if (keyboardFocus === "caps1" || keyboardFocus === "nums1" || keyboardFocus === "symbs1") {
            setKeyboardFocus("noCaps")
          }
      }
    }

    //Set the keyboardFocus (Caps/noCaps/nums/signs)
    //Isnt working for some reason??
    const changeKeyboardFocus = (button, focus)=> {
      if (gamepads[0].buttons[button].pressed === true) {
        if (gamepads[0].buttons[4].pressed === true) {
          delay(250).then(() => {setKeyboardFocus(focus)
        })
        } else 
          delay(250).then(() => setKeyboardFocus(`${focus}1`))
      } 
    }

    changeKeyboardFocus(3, "caps")
    changeKeyboardFocus(2, "nums")
    changeKeyboardFocus(1, "symbs")

    //special case: no Caps
    if (gamepads[0].buttons[0].pressed === true) {
      delay(250).then(() => setKeyboardFocus("noCaps"))
    } 
    
    if (keyboardFocus === "noCaps") {
      chooseLetter(0, "left", "s", "a", "d")
      chooseLetter(0, "right", "f", "d", "g")
      chooseLetter(1, "up", "e", "w", "r", "q", "t")
      chooseLetter(1, "down", "c", "x", "v", "y", "b")

      chooseLetter(2, "left", "j", "h", "k")
      chooseLetter(2, "right", "l", "k", "ö", "ü", "ä")
      chooseLetter(3, "up", "i", "u", "o", "z", "p")
      chooseLetter(3, "down", "m", "n", ",", "b", ".")
    }

    if (keyboardFocus === "caps1" || keyboardFocus === "caps") {
      chooseLetter(0, "left", "S", "A", "D")
      chooseLetter(0, "right", "F", "D", "G")
      chooseLetter(1, "up", "E", "W", "R", "Q", "T")
      chooseLetter(1, "down", "C", "X", "V", "Y", "B")

      chooseLetter(2, "left", "J", "H", "K")
      chooseLetter(2, "right", "L", "K", "Ö", "Ü", "Ä")
      chooseLetter(3, "up", "I", "U", "O", "Z", "P")
      chooseLetter(3, "down", "M", "N", ";", "B", ":")
    }
    if (keyboardFocus === "nums1" || keyboardFocus === "nums") {
      chooseLetter(0, "left", "4", "5", "", "0", "0")
      chooseLetter(0, "right", "5", "6", "", "0", "0")
      chooseLetter(1, "up", "8", "7", "9", "0", "0")
      chooseLetter(1, "down", "2", "1", "3", "0", "0")
    }
    
    //execute commit at letting go of the stick
    commitLetter(0, 1, 2, 3)

    //Move through the text
    //General function
    const moveCursor = (action, but) => {
      if (gamepads[0].buttons[but].pressed === true) {
        delay(250).then(() => setCursor(cursor + action))
      } 
    }
    
    moveCursor(+1, 15);
    moveCursor(-1, 14);
    moveCursor(+10, 13);
    moveCursor(-10, 12);

  } //closes controller-connected flag

  useEffect(() => {
    const input = textareaRef.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [textareaRef, cursor, text]);

  const handleChange = (e) => {
    setCursor(e.target.selectionEnd);
    setText(e.target.value);
  };

  return (
    <div className='frameAll'>
      <h1>Type here using your gamepad:</h1>       
      <Textarea
        value={text}
        id="my-textarea"
        className="myTextArea"
        maxLength="1000"
        onChange={handleChange}
        ref={textareaRef}
      />
      <Collapsible trigger={<h2>Typesupport</h2>} >
        <TypeSupport chosenLetter = {chosenLetter}/>
      </Collapsible>
      <Collapsible trigger={<h2>Manuals</h2>} >
        <Manuals />
      </Collapsible>
    </div>
  );
}

export default App;
