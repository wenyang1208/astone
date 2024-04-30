import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

export const MyColorPicker = ({label, onChange}) => {   
    const [color, setColor] = useState("#333");      
    const handleChange = color => {
      setColor(color.hex);
    };
    return (
      <div
        style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", padding: 10}}>
        <label>{label}</label>
        <ChromePicker color={color} onChange={handleChange} onChangeComplete={color=> onChange(color.hex) } />
      </div>
      )     
  }