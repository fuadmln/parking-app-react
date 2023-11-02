import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import ValidationError from '@/components/ValidationError'
import IconSpinner from '@/components/IconSpinner'

function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const { login, errors, loading } = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    await login({ email, password })
    setPassword('')
  }

  return (
    <form onSubmit={ handleSubmit } noValidate>
      <div className="flex flex-col mx-auto md:w-96 w-full">
        <h1 className="heading">Login</h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            className="form-input"
            autoComplete="email"
            disabled={ loading }
            onChange={ e => setEmail(e.target.value) }
          />
          <ValidationError errors={ errors } field="email" />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={ password }
            className="form-input"
            autoComplete="current-password"
            disabled={ loading }
            onChange={ e => setPassword(e.target.value) }
          />
          <ValidationError errors={ errors } field="password" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="remember" className="flex gap-2 items-center hover:cursor-pointer">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="w-4 h-4"
              checked ={ remember }
              disabled={ loading }
              onChange={ () => setRemember( previous => !previous ) }
            />
            <span className="select-none">Remember Me</span>
          </label>
        </div>

        <div className="border-t h-[1px] my-6"></div>

        <div className="flex flex-col gap-2 mb-4">
          <button type="submit" className="btn btn-primary" disabled={ loading }>
            { loading && <IconSpinner /> }
            Login
          </button>
        </div>
      </div>
    </form>  
  )
}

export default Login