# 🧸 Mimi & Me

A modern full-stack baby clothing e-commerce platform built with the **MERN Stack**. The application provides a smooth shopping experience for customers and a complete admin dashboard for managing products, orders, and users.

> Built to practice production-level full-stack development using React, Node.js, Express, MongoDB, Zustand, JWT Authentication, and Cloudinary.

---

## ✨ Features

### 👤 User

- User Registration & Login
- Email OTP Verification
- Secure JWT Authentication
- Forgot Password & Reset Password
- Protected Routes
- User Profile
- Browse Products
- Search Products
- Filter Products
- Product Details Page
- Add to Cart
- Update Cart Quantity
- Remove Cart Items
- Checkout
- Place Orders
- View My Orders
- Cancel Orders

---

### 👨‍💼 Admin

- Admin Dashboard
- Manage Products
- Add Products
- Edit Products
- Delete Products
- Manage Orders
- Update Order Status
- Manage Users
- Role Based Authorization
- Product Image Upload using Cloudinary

---

## 🚀 Tech Stack

### Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Zustand
- Axios
- React Hot Toast
- Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- Cloudinary
- Multer
- Cookie Parser

---

## 📂 Project Structure

```
Mimi-Me/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## 📸 Screenshots

### Home Page

```
(Add Screenshot Here)
```

### Product Page

```
(Add Screenshot Here)
```

### Cart

```
(Add Screenshot Here)
```

### Checkout

```
(Add Screenshot Here)
```

### Admin Dashboard

```
(Add Screenshot Here)
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/mimi-me.git

cd mimi-me
```

---

### Backend

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

CLIENT_URL=http://localhost:5173

EMAIL_USER=
EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

NODE_ENV=development
```

Run Backend

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

---

## 🔐 Authentication Flow

- Signup
- Email OTP Verification
- Login
- JWT Token Generation
- HTTP Only Cookie Authentication
- Protected Routes
- Role Based Authorization
- Forgot Password
- Reset Password

---

## 📦 API Modules

### Authentication

- Signup
- Login
- Logout
- Verify OTP
- Forgot Password
- Reset Password
- Current User

### Products

- Get All Products
- Get Single Product
- Search Products
- Filter Products

### Cart

- Add Item
- Update Quantity
- Remove Item
- Get Cart

### Orders

- Create Order
- My Orders
- Order Details
- Cancel Order

### Admin

- Manage Products
- Manage Orders
- Manage Users

---

## 🛡️ Security

- JWT Authentication
- HTTP Only Cookies
- Password Hashing using bcrypt
- Protected API Routes
- Admin Middleware
- Role Based Access Control
- Environment Variables

---

## 🌩️ Image Storage

- Cloudinary Integration
- Secure Image Upload
- Optimized Product Images

---

## 📈 Current Progress

### Completed

- Authentication
- Authorization
- OTP Verification
- Password Reset
- Products
- Cart
- Checkout
- Orders
- Admin Panel
- Image Upload

---

### Upcoming Features

- Razorpay Integration
- Wishlist
- Product Reviews
- Coupons
- Email Notifications
- Dashboard Analytics
- Sales Reports
- Pagination
- Advanced Filters
- Product Recommendations

---

## 📚 What I Learned

This project helped me understand:

- MERN Architecture
- REST APIs
- Authentication
- Authorization
- MongoDB Relationships
- Zustand State Management
- File Uploads
- Cloudinary Integration
- Error Handling
- Production Folder Structure
- Admin Dashboard Development

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Create a Pull Request

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Developer

**Shourya Gaur**

B.Tech CSE Student

MERN Stack Developer

---

Made with ❤️ using the MERN Stack.
