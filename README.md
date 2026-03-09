# Task Manager (MERN Stack)

A full-stack **Task Manager application** built using the **MERN stack**.
The application provides secure authentication, role-based access control, and RESTful APIs for managing tasks.
Users can register, log in, and perform CRUD operations on their tasks through a React frontend connected to a Node.js backend.

---

# Features

### Authentication

* User registration
* User login
* Password hashing using **bcrypt**
* JWT-based authentication

### Role-Based Access Control

* Supports **user** and **admin** roles
* Protected routes using middleware

### Task Management

Authenticated users can:

* Create tasks
* View tasks
* Update tasks
* Delete tasks

Each task is associated with the authenticated user.

---

# Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Zod (validation)

### Frontend

* React.js
* Axios
* React Router

### Database

* MongoDB

---

# Project Structure

```
Task_Manager
│
├── Backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── validations
│   ├── config
│   └── index.js
│
├── Frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── api
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── docs
│   └── Task Manager API.postman_collection.json
│
└── README.md
```

---

# Installation and Setup

## Clone the Repository

```
git clone https://github.com/Keshav-252/Task_Manager.git
cd Task_Manager
```

---

# Backend Setup

```
cd Backend
npm install
```
Create a `.env` file in the Backend directory:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server:
```
npm start
Backend runs on: http://localhost:3000
---

# Frontend Setup

```
cd Frontend
npm install
npm run dev
```
Frontend runs on: http://localhost:5173
---

# API Base URL

```
http://localhost:3000/api/v1
```
---

# API Endpoints

### Authentication

POST /api/v1/auth/signup
POST /api/v1/auth/login


### Tasks

GET /api/v1/tasks
POST /api/v1/tasks
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id


Protected routes require:
Authorization: Bearer <JWT_TOKEN>


---

# API Documentation

The Postman collection for testing all API endpoints is included in this repository.

Location:

```
docs/task-manager-api.postman_collection.json
```

To use it:

1. Open **Postman**
2. Click **Import**
3. Select the JSON file
4. Run the requests

---

# Security Features

* Password hashing using **bcrypt**
* JWT authentication
* Input validation using **Zod**
* Role-based authorization middleware
* Protected API routes

---

# Scalability Considerations

The project structure is designed to support future scalability, including:

* Microservices architecture
* Redis caching
* Containerization using Docker
* Load balancing
* CI/CD based deployments
