import ReactLoader from 'react-loader-spinner'

import './index.css'

const Loader = () => (
  <div className="loader-container" testid="loader">
    <ReactLoader type="TailSpin" color="#0284C7" height={50} width={50} />
  </div>
)

export default Loader
