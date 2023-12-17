import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { User } from "../../interfaces";
import bigLogo from "../../images/big-logo.png";
import randomImage from "../../images/red-brend.jpg";
import notificationIcon from "../../svg-icons/notifications-icon.svg";

const Profile = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `https://igralishte-webs.onrender.com/users/${id}`
        );
        if (response.ok) {
          const user = await response.json();
          setUserDetails(user);
        } else {
          console.error("Failed to fetch user details");
          setError("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Error fetching user details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div>User not found</div>;
  }

  return (
    <React.Fragment>
      <div className="profile">
        <Link to={"/"}>
          <img src={bigLogo} alt="igralishte-logo" className="logo" />
        </Link>
        <div className="profile-wrapper">
          <div className="img-wrapper">
            <img src={randomImage} alt="selected-img" className="profile-img" />
          </div>
          <p>Име</p>
          <div className="border-div">{userDetails.name}</div>
          <p>Презиме</p>
          <div className="border-div">{userDetails.surname}</div>
          <p>Емаил адреса</p>
          <div className="border-div">{userDetails.email}</div>
          <p>Лозинка</p>

          <div className="border-div password">******</div>
          <Link to={`/login/${id}/change-password`}>
            <span className="change-pass-span">Промени лозинка</span>
          </Link>

          <p className="adress">Адреса</p>
          <div className="border-div">{userDetails.address}</div>
          <p>Телефонски број</p>
          <div className="border-div">{userDetails.number}</div>
          <p>Биографија</p>
          <div className="border-div-bio">{userDetails.bio}</div>
          <div className="notifications">
            <img src={notificationIcon} alt="notifications-icon" />
            <p>Испраќај ми известувања за нови зделки и промоции</p>
          </div>
          <Link to="/">
            <button className="btn btn-black">Зачувај</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
