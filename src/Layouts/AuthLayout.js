import React from 'react'
import { Outlet } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'


const AuthLayout = ({}) => {
  return (
    <div className="auth-layout">
      <Container fluid className="auth-container">
        <Row className="auth-row">
          <Col md={6} className="auth-left">
            <div className="auth-logo-container">
              <img src='/logo.png' alt="My Diary Logo" className="auth-logo"/>
              <h1 className="auth-app-title">My Diary</h1>
              <p className="auth-app-tagline">Capture your thoughts, memories, and moments</p>
            </div>
          </Col>
          <Col md={6} className="auth-right">
            <div className="auth-form-container">
              <Outlet/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AuthLayout