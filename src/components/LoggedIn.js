import React, { useState } from 'react';

export default function LoggedIn({ deleteUser, inputVal, handleChange }) {
    const [popup, setPopup] = useState(false);
    return (
        <>
            <div className='delete-button' onClick={() => setPopup(true)}>Delete User</div>
            {popup ? (
                <div className='confirmation'>
                    <div className='popup'>
                        <span className='xbutton' onClick={() => setPopup(false)}>x</span>
                        
                        <input 
                            id='popupPassword'
                            type='text' 
                            value={inputVal.popupPassword || ""} 
                            placeholder='Confirm Password...'
                            onChange={handleChange} />
                        <div className='warning'>Warning! You are about to delete your account. This cannot be undone.</div>
                        <div className='buttons'>  
                            <button className='cancelbutton' onClick={() => setPopup(false)}>Cancel</button>
                            <button className='deletebutton' onClick={deleteUser}>Delete Account</button>
                        </div>
                    </div>
                </div>
            ) : ''}
        </>
    )
}