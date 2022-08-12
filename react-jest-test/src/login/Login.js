import React, { useEffect } from 'react'
import { Link, Outlet } from "react-router-dom";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button,
  
} from '@mui/material';
import axios from 'axios'
const Login = () => {
const [userName, setUserName] = React.useState('');
const [password, setPassword] = React.useState('');
const [user, setUser] = React.useState({});
useEffect(() => {
  console.log(userName, password);
} , [userName, password]);

const handleClick=async(e)=>{
 
  try {
    const {data}=await axios.get("https://jsonplaceholder.typicode.com/users/1")
    setUser(data)
  } catch (error) {
    
  } 
}
  return (
    <div style={{ padding: 40 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={'column'}
          justify={'center'}
          alignItems={'center'}
        >
          <Grid item xs={12}>
            <TextField label="Username" value={userName} onChange={(e)=>setUserName(e.target.value)}></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField label="Password" type={'password'} value={password} onChange={(e)=>setPassword(e.target.value)}></TextField>
          </Grid>
          
          
      
            <Button sx={{width:"20px"}} variant="primary" onClick={handleClick} > login </Button>
            <h1>{user.name}</h1>
          
        </Grid>
      </Paper>
    </div>
  )
}

export default Login