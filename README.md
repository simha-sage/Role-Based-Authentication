# Full-Stack Role-Based Authentication

This is a full-stack mini-project that provides a complete authentication system with two distinct user roles: **User** and **Admin**. 

This project demonstrates a secure, full-stack application with a React-based frontend and a Node.js API backend. It includes role-gated API routes, cookie-based sessions, and a separate admin dashboard for user management.

## 🚀 Live Demo

* **Frontend (Vercel):** [https://role-based-authentication-phi.vercel.app](https://role-based-authentication-phi.vercel.app)
* **Backend (Render):** [https://role-based-authentication-lry1.onrender.com](https://role-based-authentication-lry1.onrender.com)

## ✨ Features

* **Role-Based Authentication:** Users can sign up as either "User" or "Admin".
* **Secure Login:** JWT-based authentication with passwords hashed using **bcrypt**. 
* **Persistent Sessions:** Uses `httpOnly` cookies for secure, cross-origin session management.
* **Protected Routes:** Dashboard pages are only accessible to logged-in users.
* **Role-Specific UI:** The UI changes based on role (e.g., "Welcome, [Name] (Admin)").
* **Admin Dashboard:** Admins have a special dashboard to:
    * View all users and admins in separate tables.
    * Update any user's role (User <-> Admin).
    * Delete users with a confirmation prompt.

## 🛠️ Tech Stack

### Frontend
* **Framework:** Next.js 
* **Language:** TypeScript 
* **Styling:** TailwindCSS 

### Backend
* **Framework:** Node.js, Express 
* **Database:** MongoDB (using MongoDB Atlas) 
* **Authentication:** JSON Web Tokens (JWT) , bcrypt, `cookie-parser`
* **CORS:** Configured for cross-origin communication between Vercel and Render.

### Deployment
* **Frontend:** Vercel 
* **Backend:** Render 

## ⚙️ Getting Started (Local Setup)

This project is a monorepo with two main folders: `frontend` and `backend`.

### Prerequisites

* Node.js (v18 or later)
* Git
* MongoDB Atlas Account (or local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/simha-sage/Role-Based-Authentication.git
cd Role-Based-Authentication
