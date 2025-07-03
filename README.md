# AzureDirectoryProject

A secure full-stack application built with **React.js**, **Node.js**, **Express**, and **Azure**, designed to interact with the Microsoft Graph API for efficient user data management and authentication.

---

## 🚀 Features

- **Secure Authentication** — Implements OAuth 2.0/OpenID Connect using **MSAL** for user sign-in and token-based access.
- **Microsoft Graph Integration** — Fetches and displays user directory and profile data using secure Graph API calls.
- **Role & Permission Management** — Supports Azure Active Directory (AAD) role-based access control for user operations.
- **Responsive UI** — Built with **React.js**, **Tailwind CSS**, and **JavaScript** for a clean and mobile-friendly interface.

---

## 🧱 Tech Stack

| Layer         | Technologies                                              |
|---------------|-----------------------------------------------------------|
| Front-End     | React.js, Tailwind CSS, JavaScript                        |
| Back-End      | Node.js, Express                                          |
| Authentication| MSAL, OAuth 2.0, Azure AD                                 |
| API Services  | Microsoft Graph API                                       |
| Infrastructure| Azure App Services / Functions                            |

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v14+)
- A **Microsoft Azure account** with AAD permissions
- Registered application in AAD with Graph permissions

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Rtollinchi/AzureDirectoryProject.git
   cd AzureDirectoryProject

2. Install dependencies:
   npm install

3. Populate .env with:
   CLIENT_ID=<your AAD App Client ID>
   TENANT_ID=<AAD Tenant ID>
   CLIENT_SECRET=<Client Secret>

4. Run the project
   npm run dev


