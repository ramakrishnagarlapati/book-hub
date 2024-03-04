import {useState, useEffect} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import Navbar from '../../components/Navbar'
import apiStatusConstants from '../../utilities'
import Loader from '../../components/Loader'
import FailureView from '../../components/FailureView'
import Footer from '../../components/Footer'
import NoBooksFound from '../../components/NoBooksFound'
import BookItem from '../../components/BookItem'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const Bookshelves = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [searchValue, setSearchValue] = useState('')
  const [booksList, setBooksList] = useState([])
  const [activeBookshelfValue, setActiveBookshelfValue] = useState(
    bookshelvesList[0].value,
  )
  const fetchBooksList = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(
      `https://apis.ccbp.in/book-hub/books?shelf=${activeBookshelfValue}&search=${searchValue}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const {books} = data
      setBooksList(
        books.map(book => ({
          id: book.id,
          title: book.title,
          rating: book.rating,
          readStatus: book.read_status,
          authorName: book.author_name,
          coverPic: book.cover_pic,
        })),
      )
      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }
  useEffect(() => {
    fetchBooksList()
  }, [activeBookshelfValue])
  const onClickSearchButton = () => {
    fetchBooksList()
  }
  const onSearchInputKeyDown = e => {
    if (e.code === 'Enter') {
      fetchBooksList()
    }
  }

  const renderBookshelvesList = () => (
    <ul className="bookshelves-list">
      {bookshelvesList.map(item => {
        const {id, label, value} = item
        return (
          <li key={id} className="bookshelf-item">
            <button
              type="button"
              className={
                value === activeBookshelfValue
                  ? 'bookshelf-button active'
                  : 'bookshelf-button'
              }
              onClick={() => setActiveBookshelfValue(value)}
            >
              {label}
            </button>
          </li>
        )
      })}
    </ul>
  )
  const renderSuccessView = () => {
    if (!booksList.length) {
      return <NoBooksFound searchValue={searchValue} />
    }
    return (
      <div className="books-list-and-footer">
        <ul className="books-list">
          {booksList.map(book => (
            <BookItem key={book.id} bookDetails={book} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }
  const renderViewBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return <Loader />
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return <FailureView fetchFunc={fetchBooksList} />
      default:
        return null
    }
  }
  return (
    <>
      <Navbar />
      <div className="bookshelves-page-container">
        <section className="bookshelves-filter-group">
          <h2 className="bookshelves-filter-group-heading">Bookshelves</h2>
          {renderBookshelvesList()}
        </section>
        <div className="wrapper">
          <div className="bookshelves-heading-and-search-box">
            <h2 className="bookshelves-heading">
              {
                bookshelvesList.find(
                  eachBook => eachBook.value === activeBookshelfValue,
                ).label
              }{' '}
              Books
            </h2>
            <div className="search-box">
              <input
                type="search"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={e => onSearchInputKeyDown(e)}
                className="search-input"
                placeholder="Search"
              />
              <button
                type="button"
                className="search-button"
                onClick={onClickSearchButton}
                testid="searchButton"
              >
                <BsSearch color="#94A3B8" />
              </button>
            </div>
          </div>
          <div className="books-container">{renderViewBasedOnApiStatus()}</div>
        </div>
      </div>
    </>
  )
}

export default Bookshelves
