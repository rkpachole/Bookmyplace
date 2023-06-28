import { TextField, Button, Box, Alert, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUserToken } from '../../features/authSlice';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useLoginUserMutation } from '../../services/userAuthApi';


const UserLogin = () => {
  const [server_error, setServerError] = useState({
    status: false,
    msg: "",
    type: ""
  })
  
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation(true)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      //email: data.get('email'),
      user_code: data.get('user_code'),
      password: data.get('password'),
    }
    const res = await loginUser(actualData)
   
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      // console.log(typeof (msg == "Login Success"res.data))
      // console.log(res.data)
  
      storeToken(res.data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      navigate('/fieldmaster')
    }
  }
  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])
  return <>

  {/* {server_error.msg ? console.log(server_error.msg[0]):"" } */}
    {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
    {server_error.user_code ? console.log(server_error.user_code[0]) : ""}
    {server_error.password ? console.log(server_error.password[0]) : ""}
    <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
      <TextField margin='normal' required fullWidth id='user_code' name='user_code' label='user_code' />
      {server_error.user_code ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.user_code[0]}</Typography> : ""}
      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
      {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
      <Box textAlign='center'>
        {isLoading ? <CircularProgress /> : <Button type='submit' data-toggle="modal" data-target=".error-popup" variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
      </Box>
      <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
      {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
    </Box>



  {/* <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header newM">
                            
                        {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
                        {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
                        {server_error.user_code ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.user_code[0]}</Typography> : ""}
                       
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
  </>;
};
export default UserLogin;