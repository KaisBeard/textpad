import logo from './logo.svg';
import './App.css';
import {useEffect, useState, useRef } from "react";
import Textarea from 'react-expanding-textarea'
import React from 'react'
import { useGamepads } from 'react-gamepads'
import TextPadControls from "./pictures/textpad controls.png" 
import TextPadNumbers from "./pictures/textpad numpad.png" 
import Textpad from "./pictures/textpad.png" 

function TypeSupport() {
  
  return (
    <div className='frameManuals'>
      <div className='contentDiv'>
        <h3>Keyboard letters</h3>
        <img src={Textpad} />               
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
