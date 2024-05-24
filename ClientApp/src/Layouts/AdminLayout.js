import React, { Component } from 'react'
import { NavMenu } from '../components/NavMenu';
import { Container } from 'reactstrap';
import SideBar from '../components/SideBar';
export default class AdminLayout extends Component {
    static displayName = AdminLayout.name;
  render() {
    return (
        <div>
        <NavMenu />
        <Container fluid tag="main">
          <div className='row'>
            <div className='col-md-2'>
              <SideBar />
            </div>
            <div className='col-md-10'>
              {this.props.children}
            </div>
          </div>
        </Container>
      </div>
    )
  }
}
