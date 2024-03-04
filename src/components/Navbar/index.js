import Cookies from 'js-cookie'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {useState} from 'react'

import './index.css'

const Navbar = props => {
  const [isClicked, setIsClicked] = useState(false)
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const handleClick = () => {
    setIsClicked(!isClicked)
  }
  return (
    <header className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dydfqbscv/image/upload/v1708945136/website_logo_wzyg6c.png"
            className="website-logo"
            alt="website logo"
          />
        </Link>
        <button
          className="nav-action-button"
          type="button"
          onClick={handleClick}
        >
          <img
            src={
              isClicked
                ? 'https://res.cloudinary.com/dydfqbscv/image/upload/v1709026874/close-icon_yb7nod.svg'
                : 'https://res.cloudinary.com/dydfqbscv/image/upload/v1709026836/hamburger-menu-icon_enkd5l.svg'
            }
            className="menu-icon"
            alt={isClicked ? 'close' : 'menu'}
          />
        </button>
        <nav className={isClicked ? 'nav-container active' : 'nav-container'}>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="shelf" className="nav-link">
                Bookshelves
              </NavLink>
            </li>
          </ul>
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogoutBtn}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}

export default withRouter(Navbar)
