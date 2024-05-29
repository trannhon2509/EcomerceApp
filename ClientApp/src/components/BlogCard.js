import React from 'react'
import { Link } from 'react-router-dom'
import RoutePath from '../routes/RoutePath'
function BlogCard({ date, title, content }) {
  // const previewContent = content.length > 80 ? content.substring(0, 80) + "..." : content;
  return (
    <div className='col-md-6'>
    <Link to={RoutePath.BlogPage}>
      <div className="blog-box">
        <div className="blog-img back-img" style={{ backgroundImage: 'url(/PRODUCT/HOMEPage/HomePage1.JPG)' }} />
        <div className="blog-text text-black">
          <p className="blog-date">{date}</p>
          <Link to={RoutePath.BLOG} className="h4-title">{title}</Link>
          <p>{content}</p>
          <Link to={RoutePath.BLOGDETAIL} className="sec-btn">Read More</Link>
        </div>
      </div>
    </Link>
  </div>
  )
}

export default BlogCard