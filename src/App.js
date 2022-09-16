import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef } from "react";
import Textarea from 'react-expanding-textarea'
import React from 'react'
import { useGamepads } from 'react-gamepads'

function App() {
  const [gamepads, setGamepads] = useState({});
  useGamepads(gamepads => setGamepads(gamepads));

  const [text, setText] = useState("")
  const textareaRef = useRef(null); 
  const [cursor, setCursor] = useState(0)
  const [keyboardFocus, setKeyboardFocus] = useState("noCaps") //noCaps, caps, caps1, figs, figs1, nums, nums1

  //const cursorPosition = 0;

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function addStr(str, index, stringToAdd){
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
  }

  //Don't react unless gamepad connected
  if (gamepads[0] === undefined){console.log("undefined")} else {
  
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

    //Determine if to give out normal letters, caps, number or symbol dependant on the state and return the right figure
    const determineLetter = (noCapsLetter, capsLetter, number, symbol) => {
      switch(keyboardFocus) {
        case "noCaps":
          return noCapsLetter !== undefined? noCapsLetter: ""
          break;
        case "caps":
          return capsLetter !== undefined? capsLetter: ""
          break;
        case "caps1":
          setKeyboardFocus("noCaps")
          return capsLetter !== undefined? capsLetter: ""
          break;
        case "nums":
          return number !== undefined? number: ""
          break;
        case "nums1":
          setKeyboardFocus("noCaps")
          return number !== undefined? number: ""
          break;
        case "symbs":
          return symbol !== undefined? symbol: ""
          break;
        case "symbs1":
          setKeyboardFocus("noCaps")
          return symbol !== undefined? symbol: ""
          break;
        default:
      }
    }

    //type with button and axis
    //General function
    const typeButAxe = (button, axe, letterPlus, letterPlusCaps, letterMinus, letterMinusCaps, letterNumPlus, LetterNumMinus, letterSymbolPlus, LetterSymbolMinus) => {
      if (gamepads[0].buttons[button].pressed === true && gamepads[0].axes[axe] > 0.5) {
        const position = textareaRef.current.selectionEnd
        delay(250).then(() => {
          setText(addStr(text, position, determineLetter(letterPlus, letterPlusCaps, letterNumPlus, letterSymbolPlus)))
          setCursor(cursor+1) 

        })
      } else if (gamepads[0].buttons[button].pressed === true && gamepads[0].axes[axe] < -0.5) {
        const position = textareaRef.current.selectionEnd
        delay(250).then(() => {
          setText(addStr(text, position, determineLetter(letterMinus, letterMinusCaps, LetterNumMinus, LetterSymbolMinus)))
          setCursor(cursor+1)

        })
      }
    }

    typeButAxe(4, 0, "d", "D", "a", "A", 5, 0);
    typeButAxe(5, 0, "g", "G", "d", "D", 0, 5);
    typeButAxe(6, 0, "?", "?", "!", "!");
    typeButAxe(7, 0, "g", "G");
    
    typeButAxe(4, 1, "x", "X", "w", "W", 1, 7);
    typeButAxe(5, 1, "v", "V", "r", "R", 3, 9);
    typeButAxe(6, 1, "y", "Y", "v", "V");
    typeButAxe(7, 1, "b", "B", "t", "T");

    typeButAxe(4, 2, "k", "K", "h", "H", 5, 0);
    typeButAxe(5, 2, "ö", "Ö", "k", "K", 0, 5);
    typeButAxe(6, 2, ":", ":", "-", "-");
    typeButAxe(7, 2, "ä", "Ä", "ü", "Ü");
    
    typeButAxe(4, 3, "n", "N", "u", "U", 1, 7);
    typeButAxe(5, 3, ",", ",", "o", "O", 3, 9);
    typeButAxe(6, 3, "b", "B", "z", "Z");
    typeButAxe(7, 3, ".", ".", "p", "P");


    //Type with Axis without buttons
    //General function
    const typeOnlyAxe = (axe, letterPlus, letterPlusCaps, letterMinus, letterMinusCaps, letterNumPlus, LetterNumMinus, letterSymbolPlus, LetterSymbolMinus) => {
      const position = textareaRef.current.selectionEnd
      if (gamepads[0].axes[axe] > 0.5) {
        delay(250).then(() => {
          setText(addStr(text, position, determineLetter(letterPlus, letterPlusCaps, letterNumPlus, letterSymbolPlus)))
          setCursor(cursor+1)})
      } else if (gamepads[0].axes[axe] < -0.5) {
          delay(250).then(() => {
          setText(addStr(text, position, determineLetter(letterMinus, letterMinusCaps, LetterNumMinus, LetterSymbolMinus)))
          setCursor(cursor+1)})
      }
    }

    //axes without buttons input
    if (gamepads[0].buttons[4].pressed === false 
      && gamepads[0].buttons[5].pressed === false
      && gamepads[0].buttons[6].pressed === false
      && gamepads[0].buttons[7].pressed === false)
      {
        typeOnlyAxe(0, "f", "F", "s", "S", 6, 4)
        typeOnlyAxe(1, "c", "C", "e", "E", 2, 8)
        typeOnlyAxe(2, "l", "L", "j", "J", 6, 4)
        typeOnlyAxe(3, "m", "M", "i", "I", 2, 8) 
      }
    
    //Set the keyboardFocus (Caps/noCaps/nums/signs)
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


    //Move through the text
    //General function
    const moveCursor = (action, but) => {
      if (gamepads[0].buttons[but].pressed === true) {
        delay(250).then(() => setCursor(cursor+ action))
      } 
    }
    
    moveCursor(+1, 15);
    moveCursor(-1, 14);
    moveCursor(+10, 13);
    moveCursor(-10, 12);

  } //closes if loading flag

  useEffect(() => {
    const input = textareaRef.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [textareaRef, cursor, text]);

  const handleChange = (e) => {
    setCursor(e.target.selectionEnd);
    setText(e.target.value);
  };

  return (
    <div>
      <h1>type here:</h1>       
      <Textarea
        value={text}
        id="my-textarea"
        className="myTextArea"
        maxLength="1000"
        onChange={handleChange}
        ref={textareaRef}
      />
    </div>
  );
}

export default App;
