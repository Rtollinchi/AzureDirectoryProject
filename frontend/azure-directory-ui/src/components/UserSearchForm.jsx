import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserSearchForm.css";
import glgLogo from "../assets/glg-logo.png";

const UserSearchForm = () => {
  const [selectedProperty, setSelectedProperty] = useState("displayName");
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUserData([]);

    try {
      const response = await axios.post("http://localhost:8080/api/search", {
        property: selectedProperty,
        userName: searchValue,
      });
      setUserData(response.data);
    } catch (error) {
      setError("Error retrieving user data");
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const convertCamelCaseToTitle = (text) => {
    return text
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, function (str) {
        return str.toUpperCase();
      });
  };


  const renderUserData = (data) => {
    return data.map((user, index) => (
      <div key={index} className="user-data">
        <div className="user-data-row">
          <span className="user-data-label">Business Phones:</span>
          <span className="user-data-value">{Array.isArray(user.businessPhones) && user.businessPhones.length > 0 ? user.businessPhones.join(", ") : "N/A"}</span>
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
          <div className="radio-group">
            <h4>Basic Info</h4>
            {["displayName", "givenName", "surname", "userPrincipalName", "jobTitle"].map((property) => (
              <label key={property}>
                <input
                  type="radio"
                  value={property}
                  checked={selectedProperty === property}
                  onChange={handlePropertyChange}
                />
                {convertCamelCaseToTitle(property)}
              </label>
            ))}
          </div>
          <div className="radio-group">
            <h4>Contact Info</h4>
            {["businessPhone", "mobilePhone", "email", "otherEmails", "faxNumber"].map((property) => (
              <label key={property}>
                <input
                  type="radio"
                  value={property}
                  checked={selectedProperty === property}
                  onChange={handlePropertyChange}
                />
                {convertCamelCaseToTitle(property)}
              </label>
            ))}
          </div>
          <div className="radio-group">
            <h4>Location Info</h4>
            {["officeLocation", "streetAddress", "city", "stateOrProvince", "postalCode", "countryOrRegion"].map((property) => (
              <label key={property}>
                <input
                  type="radio"
                  value={property}
                  checked={selectedProperty === property}
                  onChange={handlePropertyChange}
                />
                {convertCamelCaseToTitle(property)}
              </label>
            ))}
          </div>
          <div className="radio-group">
            <h4>Other Info</h4>
            {["companyName", "department", "employeeId", "employeeType", "employeeHireDate", "manager", "sponsors", "mailNickname", "ageGroup", "consentProvidedForMinor", "usageLocation"].map((property) => (
              <label key={property}>
                <input
                  type="radio"
                  value={property}
                  checked={selectedProperty === property}
                  onChange={handlePropertyChange}
                />
                {convertCamelCaseToTitle(property)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label>
            Search Term:
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchValueChange}
              required
            />
          </label>
        </div>
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {userData && renderUserData(userData)}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserSearchForm;
