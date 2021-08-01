import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width="100%"
    height={700}
    viewBox="0 0 930 700"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="27" y="534" rx="3" ry="3" width="88" height="6" /> 
    <rect x="319" y="531" rx="3" ry="3" width="50%" height="190" /> 
    <rect x="26" y="556" rx="3" ry="3" width="50%" height="4" /> 
    <rect x="27" y="575" rx="3" ry="3" width="50%" height="4" /> 
    <rect x="25" y="-8" rx="3" ry="3" width="100%" height="501" /> 
    <rect x="32" y="597" rx="3" ry="3" width="50%" height="4" /> 
    <rect x="30" y="616" rx="3" ry="3" width="50%" height="4" />
  </ContentLoader>
)

export default MyLoader