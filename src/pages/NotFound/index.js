import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
      alt="not found"
      className="not-found-img"
    />
    <h2 className="not-found-heading">Page Not Found</h2>
    <p className="not-found-desc">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link to="/" className="home-link">
      <button className="go-to-home-button" type="button">
        Go Back to Home
      </button>
    </Link>
  </div>
)

export default NotFound
