import React from 'react';
import "./style.css";

const Input = ({value,name,onChange,type,placeholder}) => {
  return (
    <div>
      <input value={value} name={name} onChange={onChange} type={type} placeholder={placeholder} />
    </div>
  )
}

export default Input
