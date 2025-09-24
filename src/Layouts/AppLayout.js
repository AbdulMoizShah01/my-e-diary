import React, { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Collapse, Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap'
import Header from '../components/globals/Header'

const AppLayout = ({onLogout}) => {



  return (
    <main>
      <Header onLogout={onLogout} />
      <Outlet />
    </main>
  )
}

export default AppLayout