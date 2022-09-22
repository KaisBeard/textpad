import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef } from "react";
import Textarea from 'react-expanding-textarea'
import React from 'react'
import { useGamepads } from 'react-gamepads'
import TextPadControls from "./pictures/textpad controls.png" 
import TextPadNumbers from "./pictures/textpad numpad lines.png" 
import Textpad from "./pictures/textpad 2.png" 



function Manuals() {
  
  return (
    <div className='frameManuals'>
      <div className='contentDiv'>       
        <h3>Type letters</h3>
        <p>
          The system works in a way that you move around the keyboard using the sticks and der shoulder/trigger-buttons. <br /> The left stick is used for the left half of the keyboard, the right stick is used for the right half. They start at the buttons d and k. Using only the sticks, you can type the 4 letters surrounding it. <br /> E.g.: The left stick: up: e, left: s, right: f, down c. <br /> Now using the shoulder buttons you can move one more to the left/right on the keyboard (left shoulder: left, right shoulder: right e.g.: left shoulder + left stick up = w). <br /> Using the trigger buttons, you get the rest of the (letter-)keyboard. They do the same thing the shoulders do, but they move two keys left/right (e.g. left trigger + left stick up = q).  
        </p> 
        <p>
          Getting the button where the stick starts at is a little tricky (d and k). To reach them you have to move one key left with a shoulder button and push the stick in the opposing direction (e.g. right shoulder + left stick to the left = d)
        </p>
        <img src={Textpad} />
      </div>
      <div className='contentDiv'>
        <h3>Change keyboard: Caps, numbers, symbols</h3>
        <p>
          The four buttons next to the right stick change the keyboard you are moving on. Depending on the key you push you will switch to capital letters, numbers or non-capital letters. Symbols are not supported yet, except "," and "." which are accessible on the non-capital keyboard in their normal positions (right stick down + RS/RT). Pushing one of the keyboard-switching buttons will only change they keyboard for one letter/symbol and then go automatically back to the standard non-capital keyboard. If you want to write several digits or caps you can push LT + keyboard-switching button. Then the chosen keyboard will stay until you change it again.
        </p>
        <img src={TextPadControls} />
        <img src={TextPadNumbers} />
        <h3>Exceptions</h3>
        <ul>
          <li>Number 0: You can type the 0 on the number-keyboard using either stick to left + left trigger or stick to right + right trigger</li>
          <li>Letter ü: It can be typed with right stick to the left + left trigger. And yes, it is a german keyboard layout.</li>
        </ul>
      </div>
    </div>
  );
}

export default Manuals;
