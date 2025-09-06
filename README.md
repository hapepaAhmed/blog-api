# Blog API 📝

A RESTful Blog API built with **Node.js, Express, and MongoDB**.  
It includes authentication, authorization, and role-based access (admin/user).

---

## 🚀 Features
- User registration & login with JWT authentication
- Password hashing using bcrypt
- Role-based authorization (admin/user)
- CRUD operations for:
  - **Posts**
  - **Comments**
  - **Categories**
- Virtual relationships between models (Posts ↔ Comments)
- Centralized error handling middleware

---

## 📂 Project Structure

backend/
│── src/
│ ├── config/ # Database connection
│ ├── controllers/ # Route controllers (business logic)
│ ├── middleware/ # Auth & role middleware
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│── .env # Environment variables
│── package.json
│── app.js


---

## ⚙️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/hapepaAhmed/blog-api.git
   cd blog-api/backend


Install dependencies:

npm install


Create a .env file in the root directory:

MONGO_URI=mongodb://127.0.0.1:27017/blogdb
JWT_SECRET=yourSecretKey
PORT=3000


Start the server:

npm start



🔑 API Endpoints
👤 Users

POST /user/register → Register a new user

POST /user/login → Login & get token

📝 Posts

GET /post/posts → Get my posts

POST /post/posts → Create post (auth required)

PATCH /post/posts/:id → Update post

DELETE /post/posts/:id → Delete post

💬 Comments

GET /comment/comments → Get my comments

POST /comment/comments → Add comment

PATCH /comment/comments/:id → Update comment

DELETE /comment/comments/:id → Delete comment

📂 Categories (Admin only)

POST /category → Create category

GET /category → Get all categories

PATCH /category/:id → Update category

DELETE /category/:id → Delete category

🛠️ Tech Stack

Node.js

Express.js

MongoDB & Mongoose

JWT Authentication

bcrypt.js
Author

GitHub: hapepaAhmed