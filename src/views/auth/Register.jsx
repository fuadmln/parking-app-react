import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState()
  const { register } = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    const body = { 
      name, 
      email, 
      password, 
      password_confirmation: passwordConfirmation,
    }

    await register(body)

    setPassword('')
    setPasswordConfirmation('')
  }

  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Register</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="name" className="required">Name</label>
          <input 
            type="text"
            id="name"
            name="name"
            value={ name }
            onChange={ e => setName(e.target.value) }
            className="form-input"
            autoComplete="name"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="required">Email</label>
          <input 
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ e => setEmail(e.target.value) }
            className="form-input"
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="required">Password</label>
          <input 
            type="password"
            id="password"
            name="password"
            value={ password }
            onChange={ e => setPassword(e.target.value) }
            className="form-input"
            autoComplete="new-password"
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password_confirmation" className="required">Confirm Password</label>
          <input 
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={ passwordConfirmation }
            onChange={ e => setPasswordConfirmation(e.target.value) }
            className="form-input"
            autoComplete="new-password"
          />
        </div>

        <div className="border-t h-[5px] my-6"></div>

        <div className="flex flex-col gap-2 mb-4">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>

      </div>
    </form>
  )
}

export default Register