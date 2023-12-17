import React, { useState } from "react";
import bigLogo from "../../images/big-logo.png";
import googleIcon from "../../svg-icons/google-icon.svg";
import facebookIcon from "../../svg-icons/facebook-icon.svg";
import { Link } from "react-router-dom";
import useFetch from "../../custom-hooks/useFetch";
import { User } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const usersUrl = "https://igralishte-webs.onrender.com/users";
  const {
    data: users,
    isLoading,
    error: usersError,
  } = useFetch<User[]>(usersUrl);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (usersError) {
      setError("Error fetching user data");
      return;
    }

    const matchingUser = users?.find(
      (user) =>
        user.email === formData.email && user.password === formData.password
    );

    if (matchingUser) {
      try {
        const updatedUser = await fetch(
          `https://igralishte-webs.onrender.com/users/${matchingUser.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isLoggedIn: true,
            }),
          }
        );

        if (updatedUser.ok) {
          setLoggedIn(true);
          setError(null);
          navigate(`/login/${matchingUser.id}`);
        }
      } catch (error) {
        console.error("Error updating user data:", error);
        setError("Error updating user data");
      }
    } else {
      setLoggedIn(false);
      setError("Погрешна емаил адреса или лозинка");
    }
  };

  return (
    <React.Fragment>
      <div className="login">
        <Link to={"/"}>
          <img src={bigLogo} alt="igralishte-logo" className="logo" />
        </Link>
        <div className="login-wrapper">
          {loggedIn ? (
            <div className="sucessfull-login">
              <p>Успешно се логиравте!</p>
              <button className="btn btn-black">Кон вашиот профил</button>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Емаил адреса</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Лозинка</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                {error && <p className="error-message">{error}</p>}
                <p>Ја заборави лозинката?</p>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-black">
                  Најави се
                </button>
                <p className="or">или</p>
                <div className="button-wrapper">
                  <button className="pre-register-btn google-btn">
                    <img src={googleIcon} alt="google-icon" />
                    <span>Регистрирај се преку Google</span>
                  </button>
                  <button className="pre-register-btn">
                    <img src={facebookIcon} alt="facebook-icon" />
                    <span> Регистрирај се преку Facebook</span>
                  </button>
                </div>
                <p>
                  Немаш профил?
                  <Link to="/pre-register">
                    <span className="register-span">Регистрирај се</span>
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
