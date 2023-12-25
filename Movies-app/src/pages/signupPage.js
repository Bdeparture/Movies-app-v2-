import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Card, Typography } from '@mui/material';

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate(); 
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [, setRegistered] = useState(false);
  const [msg, setMsg] = useState(null); 
  const [msgType, ] = useState("error"); 

  const register = () => {
    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      setMsg("Password must contain at least one letter, one number, and one special character.");
    } else if (password !== passwordAgain) {
      setMsg("Passwords do not match.");
    } else {
      context.register(userName, password);
      setRegistered(true);
      navigate('/login'); // 注册成功后跳转到登录页面
    }};

    return (
      <Card>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'left'
          }}
        >
          <h2>SignUp page</h2>
          <p>You must register a username and password to log in</p>
          {msg && <Typography color={msgType}>{msg}</Typography>}
          <Typography style={{ textAlign: 'left' }}>Username</Typography>
          <TextField id="Email1" variant="outlined" onChange={e => setUserName(e.target.value)} sx={{ paddingBottom: 1.5 }} />
          <Typography>Password</Typography>
          <TextField id="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} sx={{ paddingBottom: 2 }} />
          <Typography>Password Again</Typography>
          <TextField id="PasswordAgain" variant="outlined" type="password" onChange={e => setPasswordAgain(e.target.value)} sx={{ paddingBottom: 2 }} />
          <Button variant="contained" type="submit" onClick={register}>Register</Button>
          <div>
            Already have an account? <Link to="/">Log in</Link>
          </div>
        </Box>
      </Card>
    );
  };

  export default SignUpPage;