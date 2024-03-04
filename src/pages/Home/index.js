import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'

import Navbar from '../../components/Navbar'
import apiStatusConstants from '../../utilities'
import Loader from '../../components/Loader'
import FailureView from '../../components/FailureView'
import ReactSlick from '../../components/ReactSlick'
import Footer from '../../components/Footer'

import './index.css'

const Home = props => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [topRatedBooksList, setTopRatedBooksList] = useState([])

  const onClickFindBooksBtn = () => {
    const {history} = props
    history.push('/shelf')
  }
  const fetchTopRatedBooks = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      'https://apis.ccbp.in/book-hub/top-rated-books',
      options,
    )
    const data = await response.json()
    if (response.ok) {
      setTopRatedBooksList(
        data.books.map(bookItem => ({
          id: bookItem.id,
          title: bookItem.title,
          coverPic: bookItem.cover_pic,
          authorName: bookItem.author_name,
        })),
      )
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    fetchTopRatedBooks()
  }, [])

  const renderViewBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.success:
        return <ReactSlick topRatedBooksList={topRatedBooksList} />
      case apiStatusConstants.failure:
        return <FailureView fetchFunc={fetchTopRatedBooks} />
      default:
        return null
    }
  }
  return (
    <>
      <Navbar />
      <main className="home-page-container">
        <header className="home-page-header">
          <h1 className="home-page-heading">Find Your Next Favorite Books?</h1>
          <p className="home-page-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <button
            className="find-books-button find-books-sm-button"
            type="button"
            onClick={onClickFindBooksBtn}
          >
            Find Books
          </button>
        </header>
        <section className="top-rated-books-section">
          <div className="heading-and-button-wrapper">
            <h2 className="top-rated-books-heading">Top Rated Books</h2>
            <button
              className="find-books-button find-books-md-button"
              type="button"
              onClick={onClickFindBooksBtn}
            >
              Find Books
            </button>
          </div>
          {renderViewBasedOnApiStatus()}
        </section>
      </main>
      {apiStatus === apiStatusConstants.success && <Footer />}
    </>
  )
}

export default Home
