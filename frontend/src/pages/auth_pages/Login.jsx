import React from 'react'
import LoginForm from './LoginForm'
export default function Login({ switchToRegister }) {
  return (
    <div>
        <LoginForm switchToRegister={switchToRegister} />
    </div>
  )
}
