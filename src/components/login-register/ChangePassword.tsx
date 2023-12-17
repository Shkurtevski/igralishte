import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import bigLogo from "../../images/big-logo.png";
import { User } from "../../interfaces";

const ChangePassword: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://igralishte-webs.onrender.com/users/${id}`
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error during user data fetch:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;

    if (field === "oldPassword") {
      setOldPassword(value);
    } else if (field === "newPassword") {
      setNewPassword(value);
    } else if (field === "repeatNewPassword") {
      setRepeatNewPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    if (user.password !== oldPassword) {
      setPasswordError("Old password is incorrect");
      return;
    }

    if (newPassword !== repeatNewPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        `https://igralishte-webs.onrender.com/users/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: newPassword,
            repeatPassword: newPassword,
          }),
        }
      );

      if (response.ok) {
        console.log("Password changed successfully!");

        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        setPasswordError(null);
        const updatedUserData = await response.json();
        setUser(updatedUserData);
        navigate(`/login/${id}`);
      } else {
        console.error("Password change failed");
      }
    } catch (error) {
      console.error("Error during password change:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="change-password">
      <Link to={"/"}>
        <img src={bigLogo} alt="igralishte-logo" className="logo" />
      </Link>
      <div className="change-password-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="old-password">Стара лозинка</label>
            <input
              type="password"
              name="old-password"
              id="old-password"
              placeholder="**********"
              value={oldPassword}
              onChange={(e) => handleChange(e, "oldPassword")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">Нова лозинка</label>
            <input
              type="password"
              name="new-password"
              id="new-password"
              placeholder="**********"
              value={newPassword}
              onChange={(e) => handleChange(e, "newPassword")}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeat-new-password">Повтори нова лозинка</label>
            <input
              type="password"
              name="repeat-new-password"
              id="repeat-new-password"
              placeholder="**********"
              value={repeatNewPassword}
              onChange={(e) => handleChange(e, "repeatNewPassword")}
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <button type="submit" className="btn btn-black">
            Зачувај
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
