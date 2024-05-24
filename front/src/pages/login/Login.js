import React, { useState } from 'react';
import postApi from '../../apis/post';
import Input from '../../components/input/Input';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import logo from "../../assets/media/logo_light.png";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isEmailFilled, setIsEmailFilled] = useState(false);

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue); // Basic email validation

    setFormData({ ...formData, email: emailValue });
    setIsEmailFilled(isEmailValid);
  };


  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let data = JSON.stringify(formData);
      const response = await postApi('/login', data);
      console.log(response);
      localStorage.setItem('userToken', response.userToken);
      navigate('/mywork');
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };



  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
      userToken&&navigate('/mywork')
  }, [])



  return (
    <div className="login-wrapper">
      <div className="login-div">
        <img src={logo} id="mainlogo" />
        <form onSubmit={handleSubmit}>
          <Input
            value={formData.email}
            required
            onChange={handleEmailChange}
            type="email"
            autoComplete="off"
            placeholder="Enter Email"
          />
          {isEmailFilled && (
            <Input
              value={formData.password}
              required
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
            />
          )}

          <Button type="submit" text={'Continue'} />
          <a href="/forgot-password">Forgot Password</a>
          <p>
            Don't have an account? <a href="/signup">Signup</a>
          </p>
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
  );
};

export default Login;
