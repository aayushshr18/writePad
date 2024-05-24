import React, { useState } from 'react'
import postApi from '../../apis/post'
import Input from '../../components/input/Input'
import Button from '../../components/Button/Button'
import logo from "../../assets/media/logo_light.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })


  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      let data = JSON.stringify(formData);
      const response = await postApi("/signup", data);
      console.log(response)
    } catch (error) {
      console.error('Error occurred:', error);
    }

  }

  return (
    <div className="login-wrapper">
    <div className="login-div">
    <img src={logo} id="mainlogo" />
      <form onSubmit={handleSubmit} >
        <Input value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required type='text' placeholder='Enter Full Name' />
        <Input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required type='email' placeholder='Enter Email' />
        <Input value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required type='password' placeholder='Enter Password' />
        <Button type='submit' text={'SignUp'} />
        <p>Already have an account? <a href='/'>Login</a></p>
      </form>


    
    </div>
    <div className="tnc">
        <p>
          By clicking “Continue with Apple/Google/Email/SAML” above, you acknowledge that you have read and understood,
          and agree to Notion's 
        </p>
        <p>
          <a href="/">Privacy Policy</a> | <a href="/">Terms & Conditions</a>
        </p>
      </div>
    </div>
  )
}

export default Signup
