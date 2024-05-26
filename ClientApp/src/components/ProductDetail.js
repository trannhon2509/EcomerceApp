import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/ProductDetail.css';

const ProductDetail = () => {
    return (
        <div className="container">
            <div className="product-content product-wrap clearfix product-detail p-sm-0 border-0">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="product-image">
                            <div id="myCarousel-2" className="carousel slide">
                                <ol className="carousel-indicators">
                                    <li data-target="#myCarousel-2" data-slide-to="0" className=""></li>
                                    <li data-target="#myCarousel-2" data-slide-to="1" className="active"></li>
                                    <li data-target="#myCarousel-2" data-slide-to="2" className=""></li>
                                </ol>
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <img src="https://www.bootdey.com/image/700x400/FFB6C1/000000" className="img-responsive" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://www.bootdey.com/image/700x400/87CEFA/000000" className="img-responsive" alt="" />
                                    </div>
                                    <div className="carousel-item">
                                        <img src="https://www.bootdey.com/image/700x400/B0C4DE/000000" className="img-responsive" alt="" />
                                    </div>
                                </div>
                                <a className="carousel-control-prev" href="#myCarousel-2" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#myCarousel-2" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                        <h2 className="name">
                            Product Name Title Here
                        </h2>
                        <div style={{ fontSize: '8px' }}>
                            <i className="fa fa-star fa-2x text-warning"></i>
                            <i className="fa fa-star fa-2x text-warning"></i>
                            <i className="fa fa-star fa-2x text-warning"></i>
                            <i className="fa fa-star fa-2x text-warning"></i>
                            <i className="fa fa-star fa-2x text-muted"></i>
                            <span className="fa fa-2x">
                                <h5>(109) Votes</h5>
                            </span>
                        </div>
                        <hr />
                        <div>
                            <h3 className="price-container">
                                $129.54
                            </h3>
                        </div>
                        <hr />
                        <div className="description description-tabs" style={{ minHeight: '430px' }}>
                            <ul id="myTab" className="nav nav-pills">
                                <li className="nav-item">
                                    <a href="#more-information" data-toggle="tab" className="nav-link active">Product Description</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#specifications" data-toggle="tab" className="nav-link">Specifications</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#reviews" data-toggle="tab" className="nav-link">Reviews</a>
                                </li>
                            </ul>
                            <div id="myTabContent" className="tab-content">
                                <div className="tab-pane fade show active" id="more-information" style={{ maxHeight: '219px', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none'  }}>
                                    <br />
                                    <strong>Description Title</strong>
                                    <p>
                                        Integer egestas, orci id condimentum eleifend, nibh nisi pulvinar eros, vitae ornare
                                        massa neque ut orci. Nam aliquet lectus sed odio eleifend, at iaculis dolor egestas.
                                        Nunc elementum pellentesque augue sodales porta. Etiam aliquet rutrum turpis, feugiat sodales ipsum consectetur nec.
                                    </p>
                                </div>
                                <div className="tab-pane fade" id="specifications" style={{ maxHeight: '219px', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none'  }}>
                                    <br />
                                    <dl className="row">
                                        <dt className="col-sm-3">Gravina</dt>
                                        <dd className="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>
                                        <dd className="col-sm-9">Donec id elit non mi porta gravida at eget metus.</dd>
                                        <dd className="col-sm-9">Eget lacinia odio sem nec elit.</dd>
                                        <br />
                                        <dt className="col-sm-3">Test lists</dt>
                                        <dd className="col-sm-9">A description list is perfect for defining terms.</dd>
                                        <br />
                                        <dt className="col-sm-3">Altra porta</dt>
                                        <dd className="col-sm-9">Vestibulum id ligula porta felis euismod semper</dd>
                                    </dl>
                                </div>
                                <div className="tab-pane fade" id="reviews">
                                    <br />
                                    <form method="post" className="well padding-bottom-10" onSubmit={(e) => e.preventDefault()}>
                                        <textarea rows={2} className="form-control" placeholder="Write a review"></textarea>
                                        <div className="margin-top-10">
                                            <button type="submit" className="btn btn-sm btn-primary pull-right">
                                                Submit Review
                                            </button>
                                            <a href="#" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="Add Location"><i className="fa fa-location-arrow"></i></a>
                                            <a href="#" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="Add Voice"><i className="fa fa-microphone"></i></a>
                                            <a href="#" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="Add Photo"><i className="fa fa-camera"></i></a>
                                            <a href="#" className="btn btn-link profile-link-btn" rel="tooltip" data-placement="bottom" title="Add File"><i className="fa fa-file"></i></a>
                                        </div>
                                    </form>
                                    <div className="chat-body no-padding profile-message" style={{ maxHeight: '219px', overflowY: 'auto', scrollbarWidth: 'none', '-ms-overflow-style': 'none'  }}>
                                        <ul>
                                            <li className="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="online" alt="" />
                                                <span className="message-text">
                                                    Alisha Molly
                                                    <span className="badge">Purchase Verified</span>
                                                    <span className="pull-right" style={{fontSize: '8px'}}>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-muted"></i>
                                                    </span>

                                                </span>
                                                <br />
                                                <span>
                                                    Can't divide were divide fish forth fish to. Was can't form the, living
                                                    life grass darkness very image let unto fowl isn't in blessed fill life
                                                    yielding above all moved
                                                </span>

                                            </li>
                                            <li className="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="online" alt="" />
                                                <span className="message-text">
                                                    Alisha Molly
                                                    <span className="badge">Purchase Verified</span>
                                                    <span className="pull-right" style={{fontSize: '8px'}}>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-muted"></i>
                                                    </span>

                                                </span>
                                                <br />
                                                <span>
                                                    Can't divide were divide fish forth fish to. Was can't form the, living
                                                    life grass darkness very image let unto fowl isn't in blessed fill life
                                                    yielding above all moved
                                                </span>

                                            </li>
                                            <li className="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="online" alt="" />
                                                <span className="message-text">
                                                    Alisha Molly
                                                    <span className="badge">Purchase Verified</span>
                                                    <span className="pull-right" style={{fontSize: '8px'}}>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-muted"></i>
                                                    </span>

                                                </span>
                                                <br />
                                                <span>
                                                    Can't divide were divide fish forth fish to. Was can't form the, living
                                                    life grass darkness very image let unto fowl isn't in blessed fill life
                                                    yielding above all moved
                                                </span>

                                            </li> <li className="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="online" alt="" />
                                                <span className="message-text">
                                                    Alisha Molly
                                                    <span className="badge">Purchase Verified</span>
                                                    <span className="pull-right" style={{fontSize: '8px'}}>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-muted"></i>
                                                    </span>

                                                </span>
                                                <br />
                                                <span>
                                                    Can't divide were divide fish forth fish to. Was can't form the, living
                                                    life grass darkness very image let unto fowl isn't in blessed fill life
                                                    yielding above all moved
                                                </span>

                                            </li> <li className="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="online" alt="" />
                                                <span className="message-text">
                                                    Alisha Molly
                                                    <span className="badge">Purchase Verified</span>
                                                    <span className="pull-right" style={{fontSize: '8px'}}>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-muted"></i>
                                                    </span>

                                                </span>
                                                <br />
                                                <span>
                                                    Can't divide were divide fish forth fish to. Was can't form the, living
                                                    life grass darkness very image let unto fowl isn't in blessed fill life
                                                    yielding above all moved
                                                </span>

                                            </li> <li className="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="online" alt="" />
                                                <span className="message-text">
                                                    Alisha Molly
                                                    <span className="badge">Purchase Verified</span>
                                                    <span className="pull-right" style={{fontSize: '8px'}}>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-muted"></i>
                                                    </span>

                                                </span>
                                                <br />
                                                <span>
                                                    Can't divide were divide fish forth fish to. Was can't form the, living
                                                    life grass darkness very image let unto fowl isn't in blessed fill life
                                                    yielding above all moved
                                                </span>

                                            </li> <li className="message">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="online" alt="" />
                                                <span className="message-text">
                                                    Alisha Molly
                                                    <span className="badge">Purchase Verified</span>
                                                    <span className="pull-right" style={{fontSize: '8px'}}>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-primary"></i>
                                                        <i className="fa fa-star fa-2x text-muted"></i>
                                                    </span>

                                                </span>
                                                <br />
                                                <span>
                                                    Can't divide were divide fish forth fish to. Was can't form the, living
                                                    life grass darkness very image let unto fowl isn't in blessed fill life
                                                    yielding above all moved
                                                </span>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-12 col-md-6 col-lg-6">
                                <a href="#" className="btn btn-success btn-lg">Add to cart ($129.54)</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
