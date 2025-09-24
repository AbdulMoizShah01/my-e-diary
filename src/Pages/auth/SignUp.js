import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Input,
  Form,
  Container,
  Row,
  Col,
} from 'reactstrap';
import "firebase/compat/auth";
import firebase from "firebase/compat/app";
import firebaseSDK from '../../firebase/firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Signup = () => {
  const auth = firebase.auth();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    let currentErrors=[];

    // Basic validation
    if (!formData.fname || !formData.lname || !formData.email || !formData.password || !formData.confirmPassword) {
      currentErrors.push("Please fill in all fields")
    }

    if (formData.password !== formData.confirmPassword) {
       currentErrors.push("Passwords do not match")
    }

    if (formData.password.length < 6) {
       currentErrors.push("Password should be at least 6 characters")
    }

    setLoading(true);
    if(currentErrors.length>0){
      setError(currentErrors?.join(" , "))
      setLoading(false);
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(formData.email, formData.password);
      
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(firebaseSDK.firestore, "Users", user.uid), {
          _id: user.uid,
          email: formData.email,        
          firstName: formData.fname,
          lastName: formData.lname,
          role: "User",
          createdAt: Date.parse(new Date())
        });
      }
      
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-background">
        <div className="signin-pattern"></div>
      </div>
      
      <Container className="d-flex justify-content-center align-items-center">
        <Row className="w-100">
          <Col md={8} lg={6} xl={5} className="mx-auto">
            <div className="signin-form">
              <div className="signin-header">
                <h2>Create Account</h2>
                <p>Sign up to get started with our service</p>
              </div>

              {error && <div className="signin-error">{error}</div>}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <div className="input-group">
                      <Input
                        name="fname"
                        type="text"
                        placeholder="First Name"
                        value={formData.fname}
                        onChange={handleChange}
                        className="signin-input"
                      />
                      <i className="input-icon fas fa-user"></i>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="input-group">
                      <Input
                        name="lname"
                        type="text"
                        placeholder="Last Name"
                        value={formData.lname}
                        onChange={handleChange}
                        className="signin-input"
                      />
                      <i className="input-icon fas fa-user"></i>
                    </div>
                  </Col>
                </Row>

                <div className="input-group">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="signin-input"
                  />
                  <i className="input-icon fas fa-envelope"></i>
                </div>

                <div className="input-group">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="signin-input"
                  />
                  <i className="input-icon fas fa-lock"></i>
                </div>

                <div className="input-group">
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="signin-input"
                  />
                  <i className="input-icon fas fa-lock"></i>
                </div>

                <Button
                  className="signin-button"
                  block
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus"></i>
                      Sign Up
                    </>
                  )}
                </Button>
              </Form>

              <div className="signin-footer">
                <p>Already have an account?{" "}
                  <Link to="/sign-in" className="signin-link">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;