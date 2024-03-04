import {Link} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookItem = ({bookDetails}) => {
  const {id, title, coverPic, readStatus, authorName, rating} = bookDetails
  return (
    <li className="book-item">
      <Link to={`/books/${id}`} className="book-details-link">
        <img src={coverPic} alt={title} className="book-item-image" />
        <div className="book-item-info">
          <h2 className="book-item-title">{title}</h2>
          <p className="book-item-author">{authorName}</p>
          <p className="book-item-rating">
            Avg Rating: <BsFillStarFill color="#FBBF24" /> {rating}
          </p>
          <p className="book-item-status">
            Status: <span className="status-value">{readStatus}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default BookItem
