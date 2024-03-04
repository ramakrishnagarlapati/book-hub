import Slider from 'react-slick'
import {Link} from 'react-router-dom'

import './index.css'

const ReactSlick = ({topRatedBooksList}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  const renderSlider = () => (
    <Slider {...settings}>
      {topRatedBooksList.map(eachBook => {
        const {id, authorName, coverPic, title} = eachBook
        return (
          <div className="slick-item" key={id}>
            <Link to={`/books/${id}`} className="book-item-link">
              <img src={coverPic} alt={title} className="slick-item-image" />
              <h3 className="slick-item-title">{title}</h3>
              <p className="slick-item-author-name">{authorName}</p>
            </Link>
          </div>
        )
      })}
    </Slider>
  )
  return <div className="slick-container">{renderSlider()}</div>
}
export default ReactSlick
