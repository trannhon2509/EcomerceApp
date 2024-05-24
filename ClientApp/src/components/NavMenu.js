import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import RoutePath from '../routes/RoutePath';

export  class NavMenu extends Component {
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
      <header >
        <Navbar className="nav-menu navbar-expand-sm navbar-toggleable-sm mb-3" container light>
          <NavbarBrand tag={Link} to="/"><img alt='logo' src='/logo.png'  width={40}/> RevibeCo</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
             
              <NavItem>
                <NavLink tag={Link} className="text-dark" to={RoutePath.DASHBOARD}>Admin</NavLink>
              </NavItem>
              <LoginMenu>
              </LoginMenu>
            </ul>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
