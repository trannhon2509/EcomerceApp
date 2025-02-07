import React, { Component } from 'react';
import BlogCard from '../components/BlogCard';
import '../assets/css/Blog.css';
import LatestPostItem from '../components/LatestPostItem';
import LatestTags from '../components/LatestTags';

export default class Blog extends Component {
  render() {

    const latestTags = ['Design', 'Development', 'Travel', 'Web Design', 'Marketing', 'Research', 'Managment'];
    const blogs = [
      {
        date: "September.15.2021",
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ipsa explicabo atque reprehenderit beatae! Accusantium soluta consequuntur blanditiis amet ad.",
        title: "Energy Drink Which You Can Make At Home."
      },
      {
        date: "September.15.2021",
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ipsa explicabo atque reprehenderit beatae! Accusantium soluta consequuntur blanditiis amet ad.",
        title: "Energy Drink Which You Can Make At Home."
      },
      {
        date: "September.15.2021",
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ipsa explicabo atque reprehenderit beatae! Accusantium soluta consequuntur blanditiis amet ad.",
        title: "Energy Drink Which You Can Make At Home."
      },
      {
        date: "September.15.2021",
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ipsa explicabo atque reprehenderit beatae! Accusantium soluta consequuntur blanditiis amet ad.",
        title: "Energy Drink Which You Can Make At Home."
      },

      // Add more blog objects here
    ];

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
                      <h6>Hello, I'm<br /> Rachel Roth</h6>
                    </div>
                  </div>
                  <p>I design and develop services for customers of all sizes, specializing in creating stylish, modern
                    websites, web services and online stores</p>
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
                    date={blog.date}
                    content={blog.content}
                    title={blog.title}
                  />
                ))}

                <div className="col-12">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1}><i className="fas fa-chevron-left" /></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item active">
                      <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                      <a className="page-link" href="#"><i className="fas fa-chevron-right" /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
