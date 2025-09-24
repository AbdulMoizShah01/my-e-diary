import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
import firebaseSDK from "../../firebase/firebase.config";
import { toast } from "react-toastify";
import { setUser } from "../../redux/actions";

const SignIn = ({ onAuthSuccess }) => {
    const auth = firebaseSDK.auth
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error } = useSelector((s) => s, shallowEqual);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [isLoading, setIsLoading] = useState(false);

    console.log("state", state);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let firebaseUser = await auth.signInWithEmailAndPassword(formData.email, formData.password);
            let userId = firebaseUser.user.uid;
            let user = (await firebaseSDK.firestore.collection("Users").doc(userId).get()).data();
            dispatch(setUser(user));
            onAuthSuccess(user);
            navigate("/");
            toast.success("User Logged In Successfully");
        }
        catch (e) {
            console.error(e);
            toast.error("Login failed. Please check your credentials.");
        }
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signin-container">
            <div className="signin-background">
                <div className="signin-pattern"></div>
            </div>

            <form className="signin-form" onSubmit={handleSubmit}>
                <div className="signin-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account to continue</p>
                </div>

                {error && <div className="signin-error">{error}</div>}

                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="signin-input"
                    />
                    <i className="input-icon fas fa-envelope"></i>
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="signin-input"
                    />
                    <i className="input-icon fas fa-lock"></i>
                </div>

                <button
                    type="submit"
                    className="signin-button"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <i className="fas fa-spinner fa-spin"></i>
                            Signing In...
                        </>
                    ) : (
                        <>
                            <i className="fas fa-sign-in-alt"></i>
                            Sign In
                        </>
                    )}
                </button>

                <div className="signin-footer">
                    <p>New to the website? <Link to="/sign-up" className="signin-link">Register here</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignIn;