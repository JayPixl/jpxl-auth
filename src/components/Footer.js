import React from "react";

export default function Footer({ user }) {
  return (
      <div className='loggedin'>
        You are logged in as {user.username}.
      </div>
  )
}