import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/BlogCard.css';
export default class BlogCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      isLiked: false,
      loading: !(props.title && props.date && props.imageUrl && props.blogId && props.description)
    };
  }

  componentDidMount() {
    const { title, date, imageUrl, blogId, description } = this.props;
    if (title && date && imageUrl && blogId && description) {
      this.setState({ loading: false });
    } else {
      // Simulate data fetching
      setTimeout(() => {
        this.setState({ loading: false });
      }, 400); // Simulated loading time
    }
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  handleLikeClick = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked
    }));
  }

  render() {
    const { title, date, imageUrl, blogId, description, author } = this.props;
    const { isHovered, isLiked, loading } = this.state;

    // Parse date string to Date object
    const parsedDate = new Date(date);
    // Get day, month, and year
    const day = parsedDate.getDate();
    const month = parsedDate.getMonth() + 1; // Months are zero-indexed
    const year = parsedDate.getFullYear();
    // Format date as "dd/mm/yyyy"
    const formattedDate = `${day}/${month}/${year}`;

    // Trim description to 400 characters
    const trimmedDescription = description.length > 400 ? description.substring(0, 400) + '...' : description;

    return (
      <div className="col-md-4" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className="card" style={{ position: 'relative' }}>
          {/* Show date in top right corner */}

          {loading ? (
            <div className="loading-overlay d-flex justify-content-center align-items-center" style={{ minHeight: '415px' }}>
              <div className="spinner-border text-primary" role="status" >
                <span className="sr-only" >Loading...</span>
              </div>
            </div>
          ) : (
            <>

              {isHovered ? (
                <>
                  <div className="card-body" style={{ height: '294px', position: 'relative' }}>

                    <div className='description' style={{ minHeight: '200px' }}>
                      {trimmedDescription}
                    </div>
                    <div className='btn btn-primary w-100' style={{ height: '40px' }}>Read More</div>
                  </div>
                </>
              ) : (
                <>
                  <img src={imageUrl} className="imw" alt={title} height={200} style={{ width: '100%' }} />
                  <div className="card-body author" style={{ height: '80px' }}><div className='author' style={{ position: 'absolute', top: '10px', left: '10px' }}>
                    {author}
                  </div>
                    <div className="dates">
                      {formattedDate}
                    </div>
                    <h5 className="text-center">{title}</h5>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

}
