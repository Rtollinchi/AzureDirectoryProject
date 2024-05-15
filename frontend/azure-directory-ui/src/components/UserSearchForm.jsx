import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    // Clear any user data, tokens, etc.
    // Redirect to the login page
    navigate("/");
  };

  return (
    <div>
      <h2>Search User Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              value="displayName"
              checked={selectedProperty === "displayName"}
              onChange={handlePropertyChange}
            />
            Display Name
          </label>
          <label>
            <input
              type="radio"
              value="givenName"
              checked={selectedProperty === "givenName"}
              onChange={handlePropertyChange}
            />
            First Name
          </label>
          <label>
            <input
              type="radio"
              value="surname"
              checked={selectedProperty === "surname"}
              onChange={handlePropertyChange}
            />
            Last Name
          </label>
          <label>
            <input
              type="radio"
              value="userPrincipalName"
              checked={selectedProperty === "userPrincipalName"}
              onChange={handlePropertyChange}
            />
            User Principal Name
          </label>
          <label>
            <input
              type="radio"
              value="jobTitle"
              checked={selectedProperty === "jobTitle"}
              onChange={handlePropertyChange}
            />
            Job Title
          </label>
          <label>
            <input
              type="radio"
              value="companyName"
              checked={selectedProperty === "companyName"}
              onChange={handlePropertyChange}
            />
            Company Name
          </label>
          <label>
            <input
              type="radio"
              value="department"
              checked={selectedProperty === "department"}
              onChange={handlePropertyChange}
            />
            Department
          </label>
          <label>
            <input
              type="radio"
              value="employeeId"
              checked={selectedProperty === "employeeId"}
              onChange={handlePropertyChange}
            />
            Employee ID
          </label>
          <label>
            <input
              type="radio"
              value="employeeType"
              checked={selectedProperty === "employeeType"}
              onChange={handlePropertyChange}
            />
            Employee Type
          </label>
          <label>
            <input
              type="radio"
              value="employeeHireDate"
              checked={selectedProperty === "employeeHireDate"}
              onChange={handlePropertyChange}
            />
            Employee Hire Date
          </label>
          <label>
            <input
              type="radio"
              value="officeLocation"
              checked={selectedProperty === "officeLocation"}
              onChange={handlePropertyChange}
            />
            Office Location
          </label>
          <label>
            <input
              type="radio"
              value="manager"
              checked={selectedProperty === "manager"}
              onChange={handlePropertyChange}
            />
            Manager
          </label>
          <label>
            <input
              type="radio"
              value="sponsors"
              checked={selectedProperty === "sponsors"}
              onChange={handlePropertyChange}
            />
            Sponsors
          </label>
          <label>
            <input
              type="radio"
              value="streetAddress"
              checked={selectedProperty === "streetAddress"}
              onChange={handlePropertyChange}
            />
            Street Address
          </label>
          <label>
            <input
              type="radio"
              value="city"
              checked={selectedProperty === "city"}
              onChange={handlePropertyChange}
            />
            City
          </label>
          <label>
            <input
              type="radio"
              value="stateOrProvince"
              checked={selectedProperty === "stateOrProvince"}
              onChange={handlePropertyChange}
            />
            State or Province
          </label>
          <label>
            <input
              type="radio"
              value="postalCode"
              checked={selectedProperty === "postalCode"}
              onChange={handlePropertyChange}
            />
            ZIP or Postal Code
          </label>
          <label>
            <input
              type="radio"
              value="countryOrRegion"
              checked={selectedProperty === "countryOrRegion"}
              onChange={handlePropertyChange}
            />
            Country or Region
          </label>
          <label>
            <input
              type="radio"
              value="businessPhone"
              checked={selectedProperty === "businessPhone"}
              onChange={handlePropertyChange}
            />
            Business Phone
          </label>
          <label>
            <input
              type="radio"
              value="mobilePhone"
              checked={selectedProperty === "mobilePhone"}
              onChange={handlePropertyChange}
            />
            Mobile Phone
          </label>
          <label>
            <input
              type="radio"
              value="email"
              checked={selectedProperty === "email"}
              onChange={handlePropertyChange}
            />
            Email
          </label>
          <label>
            <input
              type="radio"
              value="otherEmails"
              checked={selectedProperty === "otherEmails"}
              onChange={handlePropertyChange}
            />
            Other Emails
          </label>
          <label>
            <input
              type="radio"
              value="faxNumber"
              checked={selectedProperty === "faxNumber"}
              onChange={handlePropertyChange}
            />
            Fax Number
          </label>
          <label>
            <input
              type="radio"
              value="mailNickname"
              checked={selectedProperty === "mailNickname"}
              onChange={handlePropertyChange}
            />
            Mail Nickname
          </label>
          <label>
            <input
              type="radio"
              value="ageGroup"
              checked={selectedProperty === "ageGroup"}
              onChange={handlePropertyChange}
            />
            Age Group
          </label>
          <label>
            <input
              type="radio"
              value="consentProvidedForMinor"
              checked={selectedProperty === "consentProvidedForMinor"}
              onChange={handlePropertyChange}
            />
            Consent Provided for Minor
          </label>
          <label>
            <input
              type="radio"
              value="usageLocation"
              checked={selectedProperty === "usageLocation"}
              onChange={handlePropertyChange}
            />
            Usage Location
          </label>
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
        <div>
          <h3>Retrieved Data:</h3>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserSearchForm;
