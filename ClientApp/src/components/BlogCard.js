import React from 'react'
import { Link } from 'react-router-dom'
import RoutePath from '../routes/RoutePath'

function BlogCard({ date, title, content }) {
    const truncatedContent = truncateContent(content, 30); // Limit content to 100 words

    return (
        <div className='col-md-6'>
            <Link to={RoutePath.BlogPage}>
                <div className="blog-box">
                    <div className="blog-img back-img" style={{ backgroundImage: 'url(/PRODUCT/HOMEPage/HomePage1.JPG)' }} />
                    <div className="blog-text text-black">
                        <p className="blog-date">{date}</p>
                        <Link to={RoutePath.BLOG} className="h4-title">{title}</Link>
                        <p>{truncatedContent}</p>
                        <Link to={RoutePath.BLOGDETAIL} className="sec-btn">Read More</Link>
                    </div>
                </div>
            </Link>
        </div>
    )
}

function truncateContent(content, wordLimit) {
    const words = content.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ') + '...';
    }
    return content;
}

export default BlogCard
