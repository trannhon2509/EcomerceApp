import React, { Component } from 'react'

export default class WhyChoose extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="text-center mb-2-8 mb-lg-5">
                    <h2 className="display-18 display-md-16 display-lg-14 font-weight-700">Why choose <strong className="text-primary font-weight-700">Us</strong></h2>
                    <span>The trusted source for why choose us</span>
                </div>
                <div className="row align-items-center">
                    <div className="col-sm-6 col-lg-4 mb-2-9 mb-sm-0">
                        <div className="pr-md-3">
                            <div className="text-center text-sm-right mb-2-9">
                                <div className="mb-4">
                                    <img src="/why/1.gif" alt="..." className="rounded-circle" width={84}/>
                                </div>
                                <h4 className="sub-info">Premium Quality Products</h4>
                                <p className="display-30 mb-0">We take pride in offering candles and flowers of the highest quality. </p>
                            </div>
                            <div className="text-center text-sm-right">
                                <div className="mb-4">
                                    <img src="/why/2.gif" alt="..." className="rounded-circle" width={84} />
                                </div>
                                <h4 className="sub-info">Exquisite Craftsmanship</h4>
                                <p className="display-30 mb-0">Our team of skilled artisans and florists pour their passion and expertise into every product. </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 d-none d-lg-block">
                        <div className="why-choose-center-image">
                            <img src="/why/main.png" alt="..." className="rounded-circle" />
                        </div>
                    </div>
                    <div className="col-sm-6 col-lg-4">
                        <div className="pl-md-3">
                            <div className="text-center text-sm-left mb-2-9">
                                <div className="mb-4">
                                    <img src="/why/4.gif" alt="..." className="rounded-circle"  width={84}/>
                                </div>
                                <h4 className="sub-info">Personalized Service</h4>
                                <p className="display-30 mb-0">We are dedicated to providing a personalized shopping experience. From custom candle scents to bespoke floral arrangements.</p>
                            </div>
                            <div className="text-center text-sm-left">
                                <div className="mb-4">
                                    <img src="/why/3.gif" alt="..." className="rounded-circle" width={84}/>
                                </div>
                                <h4 className="sub-info">Sustainable Practices</h4>
                                <p className="display-30 mb-0">We care about our planet . Our candles are made using eco-friendly materials and sustainable practices. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
