import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserSearchForm.css";
import glgLogo from "../assets/glg-logo.png";

const UserSearchForm = () => {
  const [selectedProperty, setSelectedProperty] = useState("displayName");
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUserData(null);

    try {
      const response = await axios.post("http://localhost:8080/api/search", {
        property: selectedProperty,
        userName,
      });
      setUserData(response.data);
    } catch (error) {
      setError("Error retrieving user data");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const renderUserData = (users) => {
    return users.map((user, index) => (
      <div key={user.id || index} className="user-data">
        <h3>Retrieved Data:</h3>
        <div className="user-data-row">
          <span className="user-data-label">Business Phones:</span>
          <span className="user-data-value">
            {Array.isArray(user.businessPhones) ? user.businessPhones.join(", ") : "N/A"}
          </span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">Display Name:</span>
          <span className="user-data-value">{user.displayName || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">Given Name:</span>
          <span className="user-data-value">{user.givenName || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">Job Title:</span>
          <span className="user-data-value">{user.jobTitle || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">Email:</span>
          <span className="user-data-value">{user.mail || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">Mobile Phone:</span>
          <span className="user-data-value">{user.mobilePhone || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">Office Location:</span>
          <span className="user-data-value">{user.officeLocation || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">Preferred Language:</span>
          <span className="user-data-value">{user.preferredLanguage || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">Surname:</span>
          <span className="user-data-value">{user.surname || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">User Principal Name:</span>
          <span className="user-data-value">{user.userPrincipalName || "N/A"}</span>
        </div>
        <div className="user-data-row">
          <span className="user-data-label">ID:</span>
          <span className="user-data-value">{user.id || "N/A"}</span>
        </div>
      </div>
    ));
  };

  return (
    <div className="user-search-form">
      <img src={glgLogo} alt="GLG Logo" className="search-logo" />
      <h2>Search User Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="radio-buttons">
          {[
            "displayName",
            "givenName",
            "surname",
            "userPrincipalName",
            "jobTitle",
            "companyName",
            "department",
            "employeeId",
            "employeeType",
            "employeeHireDate",
            "officeLocation",
            "manager",
            "sponsors",
            "streetAddress",
            "city",
            "stateOrProvince",
            "postalCode",
            "countryOrRegion",
            "businessPhone",
            "mobilePhone",
            "email",
            "otherEmails",
            "faxNumber",
            "mailNickname",
            "ageGroup",
            "consentProvidedForMinor",
            "usageLocation",
          ].map((property) => (
            <label key={property}>
              <input
                type="radio"
                value={property}
                checked={selectedProperty === property}
                onChange={handlePropertyChange}
              />
              {property}
            </label>
          ))}
        </div>
        <div>
          <label>
            User Name:
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              required
            />
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {userData && (
        <div className="user-data">
          <h3>Retrieved Data:</h3>
          {renderUserData(userData)}
        </div>
      )}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserSearchForm;
