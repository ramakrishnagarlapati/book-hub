import './index.css'

const NoBooksFound = ({searchValue}) => (
  <div className="no-books-view-container">
    <img
      src="https://res.cloudinary.com/dydfqbscv/image/upload/v1709401547/no-books_fapphm.png"
      alt="no books"
      className="no-books-image"
    />
    <p className="no-books-desc">
      Your search for {searchValue} did not find any matches.
    </p>
  </div>
)

export default NoBooksFound
