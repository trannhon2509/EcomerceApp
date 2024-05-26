import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import RoutePath from '../routes/RoutePath';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="nav-menu navbar-expand-sm navbar-toggleable-sm mb-3" container light>
          <NavbarBrand tag={Link} to="/">
            <img alt='logo' src='/logo.png' width={50} />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav mr-auto mainNav">
              <NavItem>
                <NavLink tag={Link} className="text-dark fw-bold" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark fw-bold" to={RoutePath.ProductPage}>Product</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark fw-bold" to={RoutePath.BlogPage}>Blog</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark fw-bold" to={RoutePath.CONTACTPage}>Contact</NavLink>
              </NavItem>
            </ul>
            <ul className="navbar-nav ml-auto">
            <NavItem>
                <NavLink tag={Link} className="text-dark fw-bold" to={RoutePath.FAVORITEPRODUCT}><i class="bi bi-bag-heart-fill"></i></NavLink>
              </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark fw-bold" to={RoutePath.CARDPRODUCT}><i class="bi bi-cart-check-fill"></i></NavLink>
              </NavItem>
              <NavItem>
                <LoginMenu className= 'd-flex' />
              </NavItem>
            
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
