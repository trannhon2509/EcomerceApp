﻿import React, { Component } from 'react';
import BlogCard from '../components/BlogCard';
import '../assets/css/Blog.css';
import LatestPostItem from '../components/LatestPostItem';
import LatestTags from '../components/LatestTags';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogs: [],
      latestTags: [],
      pageCount: 0,
      currentPage: 0
    };
  }

  componentDidMount() {
    this.fetchData(0); // Fetch data for the first page initially
    // You might also want to fetch latestTags here
   

  }

  fetchData = (selectedPage) => {
    const apiUrl = `api/BlogPosts?page=${selectedPage + 1}&pageSize=4`; // Note: page number is 1-based
    axios.get(apiUrl)
      .then(response => {
        console.log(response.data.results)
        this.setState({
          blogs: response.data.results,
          pageCount: response.data.totalPages,
          currentPage: selectedPage
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handlePageClick = (selectedPage) => {
    this.fetchData(selectedPage.selected);
  }

  render() {
    const { blogs, latestTags, pageCount } = this.state;

    return (
      <section className="blog-listing">
        <div className="container">
          <div className="row align-items-start">

            <div className="col-lg-4 m-15px-tb blog-aside">
              <div className="widget widget-author">
                <div className="widget-title">
                  <h3>Author</h3>
                </div>
                <div className="widget-body">
                  <div className="media align-items-center">
                    <div className="avatar">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Author" />
                    </div>
                    <div className="media-body">
                      <h6>RevibeCo. chào bạn!<br /> </h6>
                    </div>
                  </div>
                  <p>Hãy cùng RevibeCo. khám phá thế giới phong cách và thư giãn, nơi bạn có thể tìm thấy đa dạng sản phẩm từ nến thơm, sáp thơm đến scrunchies, bandana và hairclip, mang đến cho bạn không gian sống và phong cách cá nhân độc đáo.</p>
                </div>
              </div>
              <div className="widget widget-post">
                <div className="widget-title">
                  <h3>Trending Now</h3>
                </div>
                <div className="widget-body">
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                </div>
              </div>
              <div className="widget widget-latest-post">
                <div className="widget-title">
                  <h3>Latest Post</h3>
                </div>
                <div className="widget-body">
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                  <LatestPostItem
                    title="Prevent 75% of visitors from google analytics"
                    author="Rachel Roth"
                    date="26 FEB 2020"
                    imageUrl="https://www.bootdey.com/image/400x200/E6E6FA/000000"
                  />
                </div>
              </div>
              <LatestTags tags={latestTags} />
            </div>
            <div className="col-lg-8 m-15px-tb">
              <div className="row">
                {blogs.map((blog, index) => (
                  <BlogCard
                    key={index}
                    id={ blog.id}
                    date={blog.postedOn}
                    content={blog.content}
                    title={blog.title}
                    image={blog.blogPostImages[0].imageUrl}
                  />
                ))}

                <div className="col-12">
                  <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    activeClassName={'active'}
                    subContainerClassName={'pages pagination'}
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLinkClassName="page-link"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
