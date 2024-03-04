import './index.css'

const FailureView = ({fetchFunc}) => {
  const onClickTryAgainBtn = () => {
    fetchFunc()
  }
  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dydfqbscv/image/upload/v1709043858/failure-view_ci4i6l.png"
        alt="failure view"
        className="failure-view-img"
      />
      <p className="failure-view-description">
        Something went wrong, Please try again.
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={onClickTryAgainBtn}
      >
        Try Again
      </button>
    </div>
  )
}
export default FailureView
