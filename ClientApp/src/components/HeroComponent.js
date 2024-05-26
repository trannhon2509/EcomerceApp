import React, { Component } from 'react'
import '../assets/css/HeroComponent.css'
import { Link } from 'react-router-dom'
export default class HeroComponent extends Component {
    render() {
        return (
           <div className='container'>
             <div className="hero">
                <section className="hero-left">
                    <h1>All your files are in one secure location, accessible anywhere.</h1>
                    <p>
                        Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface
                        without relying on meaningful content.
                    </p>
                    <Link to={'/'} className='text-decoration-none'>Get Started</Link>
                </section>
                <section className="right">
                    <img className='rounded-circle' src="https://citta.com.vn/wp-content/uploads/2023/07/O1CN01gK5Y0I1gZ2Pg0xhVQ_2209928604155-e1691473629859.jpeg" alt="Hero illustration" />
                </section>
            </div>
           </div>

        )
    }
}
