import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsFillStarFill} from 'react-icons/bs'

import apiStatusConstants from '../../utilities/index'
import Loader from '../../components/Loader'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import FailureView from '../../components/FailureView'

import './index.css'

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState(null)
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const {id: bookId} = useParams()
  const jwtToken = Cookies.get('jwt_token')

  const fetchBookDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books/${bookId}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const {book_details: bookDetailsResponseObject} = data
      setBookDetails({
        id: bookDetailsResponseObject.id,
        authorName: bookDetailsResponseObject.author_name,
        coverPic: bookDetailsResponseObject.cover_pic,
        aboutBook: bookDetailsResponseObject.about_book,
        readStatus: bookDetailsResponseObject.read_status,
        rating: bookDetailsResponseObject.rating,
        title: bookDetailsResponseObject.title,
        aboutAuthor: bookDetailsResponseObject.about_author,
      })
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    fetchBookDetails()
  }, [])
  const renderLoadingView = () => <Loader />
  const renderFailureView = () => <FailureView fetchFunc={fetchBookDetails} />
  const renderBookDetails = () => {
    const {
      authorName,
      coverPic,
      aboutBook,
      readStatus,
      rating,
      title,
      aboutAuthor,
    } = bookDetails
    return (
      <>
        <div className="book-details-success-view">
          <div className="book-details-image-and-info-container">
            <img src={coverPic} alt={title} className="book-details-image" />
            <div className="book-details-info-container">
              <h2 className="book-details-title">{title}</h2>
              <p className="book-details-author-name">{authorName}</p>
              <p className="book-details-avg-rating">
                Avg Rating: <BsFillStarFill color="#FBBF24" size={16} />{' '}
                {rating}
              </p>
              <p className="book-details-read-status">
                Status:{' '}
                <span className="book-details-read-status-value">
                  {readStatus}
                </span>
              </p>
            </div>
          </div>
          <section className="book-details-about-section-container">
            <section className="book-details-about">
              <h3 className="book-details-about-heading">About Author</h3>
              <p className="book-details-about-desc">{aboutAuthor}</p>
            </section>
            <section className="book-details-about">
              <h3 className="book-details-about-heading">About Book</h3>
              <p className="book-details-about-desc">{aboutBook}</p>
            </section>
          </section>
        </div>
        <Footer />
      </>
    )
  }
  const renderViewBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderBookDetails()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }
  return (
    <>
      <Navbar />
      <div className="book-details-container">
        {renderViewBasedOnApiStatus()}
      </div>
    </>
  )
}

export default BookDetails
