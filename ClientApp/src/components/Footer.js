import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import  RoutePaths from '../routes/RoutePath';
function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Thêm một event listener để theo dõi sự kiện cuộn của người dùng
    const handleScroll = () => {
      if (window.scrollY > 300 || document.documentElement.scrollTop > 300) { // Hiển thị nút khi vị trí cuộn vượt quá 300px
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Đăng ký event listener khi component được mount
    window.addEventListener('scroll', handleScroll);

    // Hủy bỏ event listener khi component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn lên đầu trang với hiệu ứng mượt
  };
  return (
    <footer className="site-footer" id="contact">
      <div className="top-footer section">
        <div className="sec-wp">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-4">
                <div className="footer-info">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img src="/logo.png" width={100} alt='' />
                    </a>
                  </div>
                  <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia, tenetur.
                  </p>
                  <div className="social-icon">
                    <ul>
                      <li>
                        <Link to={'https://www.facebook.com/profile.php?id=61555610512113&sk=about'} target='https://www.facebook.com/profile.php?id=61555610512113&sk=about'>
                        <i class="bi bi-facebook"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={''}>
                        <i class="bi bi-instagram"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={''}>
                        <i class="bi bi-tiktok"></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={''}>
                        <i class="bi bi-youtube"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="footer-flex-box">
                  <div className="footer-table-info">
                    <h3 className="h3-title px-4">open hours</h3>
                    <ul>
                      <li><i className="uil uil-clock" /> Mon-Thurs : 9am - 22pm</li>
                      <li><i className="uil uil-clock" /> Fri-Sun : 11am - 22pm</li>
                    </ul>
                  </div>
                  <div className="footer-menu food-nav-menu">
                    <h3 className="h3-title px-3">Links</h3>
                    <ul className="column-2">
                    <li><Link to={RoutePaths.HOME}>Home</Link></li>
                      <li><Link to={RoutePaths.ProductPage}>Shop</Link></li>
                      <li><Link to={RoutePaths.BlogPage}>Blog</Link></li>
                      <li><Link to={RoutePaths.CONTACTPage}>Contact</Link></li>
                    </ul>
                  </div>
                  <div className="footer-menu">
                    <h3 className="h3-title px-4">Company</h3>
                    <ul>
                      <li><Link to={''}>Terms &amp; Conditions</Link></li>
                      <li><Link to={''}>Privacy Policy</Link></li>
                      <li><Link to={''}>Cookie Policy</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="copyright-text">
                <p>Copyright © 2021 <span className="name">TechieCoder.</span>All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
          {isVisible && (<button className="scrolltop scroll-to-top-button show" onClick={handleScrollToTop} ><i class="bi bi-arrow-up-circle-fill"></i></button>)}
        </div>
      </div>
    </footer>



  )
}

export default memo(Footer) 