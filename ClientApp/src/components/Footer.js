import React, { Component } from 'react'
import '../assets/css/Footer.css'
export default class Footer extends Component {
    render() {
        return (
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossOrigin="anonymous" />
                <section className="deneb_cta">
                    <div className="container-fluid p-0">
                        <div className="cta_wrapper">
                            <div className="row align-items-center">
                                <div className="col-lg-7">
                                    <div className="cta_content">
                                        <h3>Have Any Project in Mind ?</h3>
                                        <p>Curabitur libero eros, efficitur sit amet sodales tincidunt, aliquet et leo sed ut nibh
                                            feugiat, auctor enim quis.</p>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="button_box">
                                        <a href="#" className="btn btn-warning">Hire Us</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="deneb_footer">
                    <div className="widget_wrapper" style={{ backgroundImage: 'url(http://demo.tortoizthemes.com/deneb-html/deneb-ltr/assets/images/footer_bg.png)' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="widget widegt_about">
                                        <div className="widget_title">
                                            <img src="/logo.png" className="img-fluid" alt='logo' width={100} />
                                        </div>
                                        <p>Quisque orci nisl, viverra et sem ac, tincidunt egestas massa. Morbi est arcu, hendrerit
                                            ac vehicula condimentum, euismod nec tortor praesent consequat urna.</p>
                                        <ul className="social">
                                            <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                                            <li><a href="#"><i className="fab fa-twitter" /></a></li>
                                            <li><a href="#"><i className="fab fa-instagram" /></a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="widget widget_link">
                                        <div className="widget_title">
                                            <h4>Links</h4>
                                        </div>
                                        <ul>
                                            <li><a href="#">About Us</a></li>
                                            <li><a href="#">Services</a></li>
                                            <li><a href="#">Portfolio</a></li>
                                            <li><a href="#">Blog</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-12">
                                    <div className="widget widget_contact">
                                        <div className="widget_title">
                                            <h4>Contact Us</h4>
                                        </div>
                                        <div className="contact_info">
                                            <div className="single_info">
                                                <div className="icon">
                                                    <i className="fas fa-phone-alt" />
                                                </div>
                                                <div className="info">
                                                    <p>1800-121-3637</p>
                                                    <p>+91 924-614-7999</p>
                                                </div>
                                            </div>
                                            <div className="single_info">
                                                <div className="icon">
                                                    <i className="fas fa-envelope" />
                                                </div>
                                                <div className="info">
                                                    <p>revibeco@gmail.com
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="single_info">
                                                <div className="icon">
                                                    <i className="fas fa-map-marker-alt" />
                                                </div>
                                                <div className="info">
                                                    <p>FPT Danang Technology Urban Area, Hoa Hai Ward, Ngu Hanh Son District, City. Danang</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright_area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="copyright_text">
                                        <p>Copyright © 2020 All rights reserved.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        )
    }
}
