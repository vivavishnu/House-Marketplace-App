import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../Components/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong with registration.");
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              className="nameInput"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="emailInput"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                className="passwordInput"
                name="password"
                id="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="show password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <div className="flex-signup">
              <div className="signUpBar">
                <p className="signUpText">Sign Up</p>
                <button className="signUpButton">
                  <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
                </button>
              </div>
              <OAuth />
            </div>
            <Link to="/sign-in" className="signInLink">
              SignIn Instead
            </Link>
          </form>
        </main>
      </div>
    </>
  );
}

export default SignUp;
