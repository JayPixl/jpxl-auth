import React from "react";

export default function Form({ inputVal, handleChange, submit, errors }) {
    return (
        <div className="form">
            <input 
                id='username'
                type='text' 
                value={inputVal.username || ""} 
                placeholder='Username...'
                onChange={handleChange} />
            <input 
                id='password'
                type='text' 
                value={inputVal.password || ""} 
                placeholder='Password...'
                onChange={handleChange} />
            {errors.map(err => {
                return (
                    <div className="error-message" key={crypto.randomUUID()}>{err}</div>
                )
            })}
            <button onClick={submit}>
                Submit
            </button>
        </div>
    )
}