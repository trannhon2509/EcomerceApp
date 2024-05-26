import React, { Component, Fragment } from 'react';
import { NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';
import RoutePath from '../../routes/RoutePath';

export class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      userName: null,
      dropdownOpen: false
    };

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.populateState());
    this.populateState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  async populateState() {
    const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
    const userName = user && user.name ? user.name.split('@')[0] : null;
    this.setState({
      isAuthenticated,
      userName
    });
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { isAuthenticated, userName } = this.state;
    if (!isAuthenticated) {
      const registerPath = `${ApplicationPaths.Register}`;
      const loginPath = `${ApplicationPaths.Login}`;
      return this.anonymousView(registerPath, loginPath);
    } else {
      const profilePath = `${ApplicationPaths.Profile}`;
      const logoutPath = `${ApplicationPaths.LogOut}`;
      const logoutState = { local: true };
      return this.authenticatedView(userName, profilePath, logoutPath, logoutState);
    }
  }

  authenticatedView(userName, profilePath, logoutPath, logoutState) {
    return (
      <Fragment>
        <NavItem className='navInfo m-0' >
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
            <DropdownToggle tag="span" className="nav-link text-dark fw-bold" caret>
              {userName}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag={Link} to={profilePath}>Profile</DropdownItem>
              <DropdownItem tag={Link} to={RoutePath.DASHBOARD}>Admin</DropdownItem>
              <DropdownItem tag={Link} to={logoutPath} state={logoutState}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      </Fragment>
    );
  }

  anonymousView(registerPath, loginPath) {
    return (
      <div className='d-lg-flex d-md-flex'>
        <NavItem>
          <NavLink tag={Link} className="text-dark fw-bold" to={registerPath}>Register</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} className="text-dark fw-bold" to={loginPath}>Login</NavLink>
        </NavItem>
      </div>
    );
  }
}
