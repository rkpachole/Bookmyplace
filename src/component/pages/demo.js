import axios from 'axios';
import React, { useState } from 'react';

const PasswordValidationExample = () => {
    const [newPassword, setNewPassword] = useState(false);
    const [retypePassword, setRetypePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
        setPasswordError('');
    };

    const handleRetypePasswordChange = (event) => {
        setRetypePassword(event.target.value);
        setPasswordError('');
    };

    //   const handleSubmit = (event) => {
    //     event.preventDefault();

    //     if (newPassword !== retypePassword) {
    //       setPasswordError('Passwords do not match.');
    //     } else if (newPassword.trim() === '') {
    //       setPasswordError('New password is required.');
    //     } else {
    //       // Passwords match and new password is not empty, proceed with logic here
    //       // e.g., submit the form or perform further actions
    //     }
    //   };

    const handleSubmit = (e) => {



        e.preventDefault();



        if (newPassword !== retypePassword) {
            alert('Passwords do not match.');
        } else if (newPassword.trim() === '') {
            alert("succes")
        } else {
            // Passwords match and new password is not empty, proceed with logic here
            // e.g., submit the form or perform further actions
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
            </div>
            <div>
                <label>Retype Password:</label>
                <input
                    type="password"
                    value={retypePassword}
                    onChange={handleRetypePasswordChange}
                />
            </div>
            {passwordError && <p>{passwordError}</p>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default PasswordValidationExample;
