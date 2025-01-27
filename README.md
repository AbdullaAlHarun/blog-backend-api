# Blog Backend API

## Overview
This is a Node.js and Express-based backend API for a simple blog system. It allows users to register, log in, and perform CRUD operations on posts. The API uses MySQL as the database and JWT for authentication.

## Features
- User authentication (JWT-based)
- CRUD operations for blog posts
- Protected routes requiring authentication
- MySQL database integration
- Environment variable support

---

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- MySQL
- Git

### Steps to Install
1. Clone the repository:
   ```bash
   git clone https://github.com/AbdullaAlHarun/blog-backend-api.git
   cd blog-backend-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file:
   Create a `.env` file in the root directory and add your configuration:
   ```env
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   JWT_SECRET=your_secret_key_here
   PORT=3000
   ```
4. Run the server:
   ```bash
   npm run dev
   ```
5. Access the API at `http://localhost:3000`

---

## API Documentation

### Authentication

#### Register a new user
**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**
```json
{
    "message": "User registered successfully"
}
```

---

#### Login a user
**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
    "email": "john@example.com",
    "password": "securepassword"
}
```

**Response:**
```json
{
    "message": "Login successful",
    "token": "your_jwt_token_here"
}
```

---

### Users

#### Get all users (Public)
**Endpoint:** `GET /users`

**Response:**
```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
]
```

---

### Posts

#### Get all posts (Protected)
**Endpoint:** `GET /posts`

**Headers:**
```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

**Response:**
```json
[
    {
        "id": 1,
        "title": "My First Post",
        "content": "This is a blog post",
        "user_id": 1
    }
]
```

---

#### Create a new post (Protected)
**Endpoint:** `POST /posts`

**Headers:**
```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

**Request Body:**
```json
{
    "title": "New Post",
    "content": "This is my new blog post",
    "user_id": 1
}
```

**Response:**
```json
{
    "message": "Post added successfully"
}
```

---

#### Update a post (Protected)
**Endpoint:** `PUT /posts/:id`

**Headers:**
```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

**Request Body:**
```json
{
    "title": "Updated Post",
    "content": "Updated content"
}
```

**Response:**
```json
{
    "message": "Post updated successfully"
}
```

---

#### Delete a post (Protected)
**Endpoint:** `DELETE /posts/:id`

**Headers:**
```json
{
    "Authorization": "Bearer your_jwt_token_here"
}
```

**Response:**
```json
{
    "message": "Post deleted successfully"
}
```

---

## Deployment

### Deploy to Vercel
1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Deploy the project:
   ```bash
   vercel --prod
   ```

Ensure environment variables are configured in Vercel settings.

---

## Technologies Used
- Node.js
- Express.js
- MySQL
- JWT Authentication
- dotenv
- Vercel (for deployment)

---

## License
This project is licensed under the MIT License.

---


