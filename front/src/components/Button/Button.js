import React from 'react';
import "./style.css";

const Button = ({type,text}) => {
  return (
    <div className='login-div'>
       <button type={type}>{text}</button>
    </div>
  )
}

export default Button
