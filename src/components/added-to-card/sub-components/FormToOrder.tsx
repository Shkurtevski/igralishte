import React, { useState } from "react";
import sparksElements from "../../../images/sparks-elements.png";
import xIcon from "../../../svg-icons/x-icon.svg";
import { Link, useNavigate } from "react-router-dom";

const FormToOrder = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const handleCancel = () => {
    setIsFormSubmitted(false);

    const form = document.getElementById("order-form") as HTMLFormElement;
    if (form) {
      form.reset();
    }
    navigate("/added-to-card");
  };

  return (
    <React.Fragment>
      <div className={`form-to-order${isFormSubmitted ? " submitted" : ""}`}>
        {!isFormSubmitted && (
          <React.Fragment>
            <img
              src={sparksElements}
              alt="sparks-elements"
              className="sparks-elements"
            />
            <h3>Ве молиме внесете ги потребните информации</h3>
            <div className="form-to-order-wrapper">
              <Link to="/added-to-card">
                <img src={xIcon} alt="x-icon" className="x-icon" />
              </Link>
              <form id="order-form" onSubmit={handleSubmit}>
                <div className="save-info-group">
                  <input type="checkbox" name="save-info" id="save-info" />
                  <label htmlFor="save-info">
                    вметни ги информациите од мојот профил
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="name">Име*</label>
                  <input type="text" name="name" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="surname">Презиме*</label>
                  <input type="text" name="surname" id="surname" required />
                </div>
                <div className="form-group">
                  <label htmlFor="home-adress">Адреса на живеење*</label>
                  <input
                    type="text"
                    name="home-adress"
                    id="home-adress"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tel">Телефонски број*</label>
                  <input type="tel" name="tel" id="tel" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Емаил адреса*</label>
                  <input type="email" name="email" id="email" required />
                </div>

                <div className="subscription-group">
                  <input
                    type="checkbox"
                    name="subscription"
                    id="subscription"
                  />
                  <label htmlFor="subscription">
                    сакам да добивам новости за идни попусти, нови колекции и
                    промоции на мојата емаил адреса.
                  </label>
                </div>
                <div className="button-wrapper">
                  <button type="submit" className="btn btn-gold-gradient">
                    Нарачај
                  </button>
                  <span onClick={handleCancel}>откажи</span>
                </div>
              </form>
            </div>
          </React.Fragment>
        )}
        {isFormSubmitted && (
          <div className="order-successful">
            <img src={sparksElements} alt="sparks-elements" />
            <h3>Вашата нарачка е успешна!</h3>
            <p>
              Очекувајте потврда за вашата нарачка на вашата емаил адреса. Keep
              on shining *
            </p>
            <Link to="/product-page">
              <button className="btn btn-gold-gradient">Продолжи</button>
            </Link>
            <Link to="/">
              <span>Кон почетна</span>
            </Link>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default FormToOrder;
