import React from "react";

export default function Bar({ page, logOut, setPage }) {
    const logIn = () => {
        setPage(2)
    }

    const signUp = () => {
        setPage(1)
    }
    
    return (
        <div className="topbar">
            <div className="links">
                {page>2 ? (
                    <>
                        <div className="logout link" onClick={logOut}>Log Out</div>
                    </>
                ) : (
                    <>
                        <div className="signup link" onClick={signUp}>Sign Up</div>
                        <div className="login link" onClick={logIn}>Log In</div>
                    </>
                )}
            </div>
        </div>
    )
}