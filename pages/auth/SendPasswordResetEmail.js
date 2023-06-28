import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from 'react';
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";
const SendPasswordResetEmail = () => {
  const [server_error, setServerError] = useState({})
  const [server_msg, setServerMsg] = useState({})
  const [sendPasswordResetEmail, { isLoading }] = useSendPasswordResetEmailMutation()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get('email'),
    }
    const res = await sendPasswordResetEmail(actualData)
    if (res.error) {
      console.log(typeof (res.error.data.errors))
      console.log(res.error.data.errors)
      setServerMsg({})
      setServerError(res.error.data.errors)
    }
    if (res.data) {
      console.log(typeof (res.data))
      console.log(res.data)
      setServerError({})
      setServerMsg(res.data)
      document.getElementById('password-reset-email-form').reset()
    }
  }

  const fieldpagerefresh = () => {
    window.location.reload(false);
  }
  return <>
    <section>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-xl-7'>

            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4 }}>
              <h1>Reset Password</h1>
              <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-email-form' onSubmit={handleSubmit}>
                <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
                {/* {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""} */}
                <Box textAlign='center'>
                  <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 } } data-toggle="modal" data-target=".error-popup">Send</Button>
                </Box>
                {/* {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''} */}
                {/* {server_msg.msg ? <Alert severity='success'>{server_msg.msg}</Alert> : ''} */}
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </section>

    {/* Error modal */}
    <div className="modal fade error-popup" tabIndex={-1} role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header newM">
            {server_error.email ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
            {server_error.non_field_errors ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }} severity='error'>{server_error.non_field_errors[0]}</Typography> : ''}
            {server_msg.msg ? <Typography style={{ fontSize: 17, color: 'red', paddingLeft: 10 }} severity='success'>{server_msg.msg}</Typography> : ''}
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={fieldpagerefresh}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  </>;
};

export default SendPasswordResetEmail;
