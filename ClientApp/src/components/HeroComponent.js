import React from 'react';
import '../assets/css/HeroComponent.css';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter'; // Ensure this is the correct import for your typewriter hook

const HeroComponent = () => {
    const [text] = useTypewriter({
        words: ['protect', 'cherish', 'conserve'],
        loop: {},
        deleteSpeed: 200,
        typeSpeed: 100,
    });

    return (
        <section className="main-banner" id="home">
            <div className='shape-img'>
                <div className="banner-shape-1 w-100" data-depth="0.30">
                    <img src="/img/berry.png" alt='' />
                </div>
                <div className="banner-shape-2 w-100" data-depth="0.25">
                    <img src="/img/leaf.png" alt='' />
                </div>
            </div>
            <div className="sec-wp">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="banner-text">
                                <h1 className="h1-title">
                                    Let's { }
                                    <span className='text-success'>{text}<Cursor /></span>
                                    {'\n'}
                                    Enviroment.
                                </h1>
                                <p>This is Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam eius
                                    vel tempore consectetur nesciunt? Nam eius tenetur recusandae optio aperiam.</p>
                                <div className="banner-btn mt-4">
                                    <Link to={''} className="sec-btn fw-bold">Check our Menu</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="banner-img-wp">
                                <div className="banner-img" style={{ backgroundImage: 'url(/PRODUCT/HOMEPage/HomePage1.jpg)' }}>
                                </div>
                            </div>
                            <div className="banner-img-text mt-4 m-auto">
                                {/* <h5 className="h5-title">Lamp</h5>
                                <p>this is Lorem ipsum dolor sit amet consectetur adipisicing elit.</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroComponent;
