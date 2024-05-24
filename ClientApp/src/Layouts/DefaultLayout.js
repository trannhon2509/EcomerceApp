import React, { Component } from 'react';
import { NavMenu } from '../components/NavMenu';
import { Container } from 'reactstrap';
import '../assets/css/DefaultLayout.css'; // Ensure you have a CSS file for styling

export default class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showScrollToTop: false,
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const navMenu = document.querySelector('.nav-menu');
        if (window.scrollY > 50) {
            navMenu.classList.add('sticky');
        } else {
            navMenu.classList.remove('sticky');
        }

        // Show or hide scroll to top button
        if (window.scrollY > 200) {
            this.setState({ showScrollToTop: true });
        } else {
            this.setState({ showScrollToTop: false });
        }
    };

    scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    render() {
        return (
            <div>
                <NavMenu />
                <Container tag="main">
                    {this.props.children}
                </Container>
                {this.state.showScrollToTop && (
                    <button className="scroll-to-top" onClick={this.scrollToTop}>
                        <i class="bi bi-arrow-up-circle-fill"></i>
                    </button>
                )}
            </div>
        );
    }
}
