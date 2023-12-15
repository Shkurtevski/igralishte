import React, { useState } from "react";
import bigLogo from "../../images/big-logo.png";
import notificationsIcon from "../../svg-icons/notifications-icon.svg";
import { User } from "../../interfaces";
import randomImage from "../../images/main-days-brend.jpg";

const RegisterTwo: React.FC = () => {
  const initialFormData: User & {
    picture: File | null;
    address: string;
    bio: string;
  } = {
    id: 0,
    name: "",
    surname: "",
    email: "",
    password: "",
    repeatPassword: "",
    subscribe: false,
    picture: null,
    address: "",
    bio: "",
    isLoggedIn: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [token, setToken] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showSecondText, setShowSecondText] = useState(false);
  const [notificationsClicked, setNotificationsClicked] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setFormData((prevData) => ({ ...prevData, picture: file }));
    }
  };

  const handleRegisterClick = () => {
    if (formData.password === formData.repeatPassword) {
      setShowRegistrationForm(!showRegistrationForm);
    } else {
      setPasswordError("Passwords do not match");
    }
  };

  const handleAdditionalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAdditionalInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFormData(initialFormData);
    setPasswordError(null);
    setShowSecondText(false);
    setNotificationsClicked(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password" || name === "repeatPassword") {
      const otherFieldName =
        name === "password" ? "repeatPassword" : "password";
      const otherFieldValue = formData[otherFieldName];
      if (value !== otherFieldValue) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError(null);
      }
    }

    if (name === "subscribe") {
      setNotificationsClicked(checked);
      setShowSecondText(false);
    }
  };

  const handleNotificationsClick = () => {
    setNotificationsClicked(true);
    setShowSecondText(true);
    setFormData((prevData) => ({
      ...prevData,
      subscribe: true,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if password is at least 6 characters using regex
    const passwordRegex = /^.{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError("Password must have at least 6 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();

        setToken(user.token);

        console.log("User registered!");

        setFormData(initialFormData);
        setPasswordError(null);
        setShowSecondText(false);
        setNotificationsClicked(false);
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <React.Fragment>
      <div className={`register ${showSecondText ? "green-background" : ""}`}>
        <img src={bigLogo} alt="igralishte-logo" />
        <div className="register-wrapper">
          {token ? (
            <p>Registration successful. You are now authenticated!</p>
          ) : (
            <form onSubmit={handleSubmit}>
              {showRegistrationForm ? (
                <React.Fragment>
                  <div className="form-group">
                    <label htmlFor="name">Име</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="surname">Презиме</label>
                    <input
                      type="text"
                      name="surname"
                      id="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Емаил Адреса</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Лозинка</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="******"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="repeat-password">Повтори лозинка</label>
                    <input
                      type="password"
                      name="repeatPassword"
                      id="repeat-password"
                      value={formData.repeatPassword}
                      onChange={handleChange}
                      placeholder="******"
                    />
                    {passwordError && (
                      <p className="error-message">{passwordError}</p>
                    )}
                  </div>

                  <div
                    onClick={handleNotificationsClick}
                    className={`notifications ${
                      notificationsClicked ? "hide-first-text" : ""
                    }`}
                  >
                    <img src={notificationsIcon} alt="notifications-icon" />
                    {!notificationsClicked && (
                      <p>Испраќај ми известувања за нови зделки и промоции</p>
                    )}
                    {showSecondText && (
                      <p className="thanks-for-subscribe">
                        Ви благодариме за потврдата!
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleRegisterClick}
                    className="btn btn-black"
                  >
                    Register
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="form-group image-upload-group">
                    <img src={randomImage} alt="selected-img" />
                    <div className="btn-wrapper">
                      <label htmlFor="picture" className="image-button">
                        Одбери слика
                      </label>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      name="picture"
                      id="picture"
                      onChange={handleImageChange}
                      className="image-input"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Адреса</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleAdditionalInfoChange}
                      placeholder="Вашата адреса"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="bio">Биографија</label>
                    <textarea
                      name="bio"
                      id="bio"
                      value={formData.bio}
                      onChange={handleAdditionalInfoChange}
                      placeholder="Вашата биографија"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-black"
                    onSubmit={handleAdditionalInfoSubmit}
                  >
                    Заврши
                  </button>
                </React.Fragment>
              )}
            </form>
          )}
          <p className="privacy-policy">
            Со вашата регистрација, се согласувате со{" "}
            <span>Правилата и Условите</span> за кориснички сајтови.
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default RegisterTwo;
