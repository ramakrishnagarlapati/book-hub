import {useState} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const jwtToken = Cookies.get('jwt_token')
  const onFormSubmit = async event => {
    event.preventDefault()
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      const {history} = props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      setErrorMsg(data.error_msg)
      setShowErrorMsg(true)
    }
  }
  if (jwtToken) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-page-container">
      <div className="login-page-left-container">
        <picture>
          <source
            srcSet="https://res.cloudinary.com/dydfqbscv/image/upload/v1708945136/login-website-medium_uompja.png"
            media="(min-width:768px)"
          />
          <img
            src="https://res.cloudinary.com/dydfqbscv/image/upload/v1708944948/login-website-small_g3hq7z.png"
            alt="website login"
            className="website-login-img"
          />
        </picture>
      </div>
      <div className="login-page-right-container">
        <form className="login-form-container" onSubmit={onFormSubmit}>
          <img
            src="https://res.cloudinary.com/dydfqbscv/image/upload/v1708945136/website_logo_wzyg6c.png"
            className="login-website-logo"
            alt="login website logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="input-label">
              Username*
            </label>
            <input
              type="text"
              value={username}
              id="username"
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              className="input-field"
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              Password*
            </label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="input-field"
            />
          </div>
          {showErrorMsg && <p className="error-message">{errorMsg}</p>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
