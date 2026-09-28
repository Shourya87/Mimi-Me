# 🧸 Mimi & Me

### A production-oriented full-stack fashion e-commerce platform built with the MERN stack.

Mimi & Me is a modern full-stack e-commerce platform designed to deliver a clean, warm, and premium shopping experience for **women, girls, babies, and accessories**.

The platform provides an end-to-end commerce workflow covering authentication, product discovery, cart and wishlist management, checkout, Razorpay payments, coupons, order management, user accounts, and a dedicated role-based admin dashboard.

> Built as a production-oriented full-stack application to demonstrate scalable architecture, secure authentication, RESTful API design, state management, payment integration, cloud-based media handling, validation, responsive UI development, and deployment practices.

---

## ✨ Highlights

- 🛍️ Complete end-to-end e-commerce workflow
- 🔐 JWT authentication with HTTP-only cookies
- 📧 Email OTP verification
- 🔑 Forgot & reset password functionality
- 👤 User profile and account management
- ❤️ Wishlist management
- 🛒 Persistent server-side cart
- 🔎 Product search, filtering, and sorting
- 💳 Razorpay payment integration
- 📦 Complete order lifecycle management
- 🎟️ Coupon creation, validation, and application
- 👨‍💼 Role-based admin dashboard
- ☁️ Cloudinary-powered image management
- 🧩 Zod request validation
- 🔔 Centralized toast and error handling
- 📱 Responsive customer and admin interfaces
- 🎨 Consistent premium fashion-focused UI
- 🚀 Production deployment

---

# 🛍️ Customer Features

## 🔐 Authentication & Account

- User registration
- Email OTP verification
- Secure login/logout
- JWT-based authentication
- HTTP-only cookie authentication
- Protected routes
- Persistent user sessions
- Forgot password
- Password reset
- Password hashing with bcrypt
- User profile management
- Account information management
- Address management
- Change password

---

## 🛍️ Product Discovery

### Products

- Browse products
- Product detail pages
- Product image galleries
- Product categories
- Regular pricing
- Discount pricing
- Stock availability
- Product sizes
- Product colors
- Featured products
- New arrivals

### Search, Filtering & Sorting

- Product search
- Category filtering
- Price-based sorting
- Name-based sorting
- Latest product sorting
- Availability-based filtering

---

## 🛒 Shopping Cart

- Add products to cart
- Update product quantity
- Increase/decrease quantity
- Remove cart items
- Server-side cart persistence
- Automatic subtotal calculation
- Shipping calculation
- Discount calculation
- Final order total calculation

---

## ❤️ Wishlist

- Add products to wishlist
- Remove products from wishlist
- View saved products
- Persistent wishlist
- Authentication-protected wishlist operations

---

## 💳 Checkout & Payments

- Checkout workflow
- Shipping information
- Order summary
- Coupon application
- Discount calculation
- Razorpay integration
- Payment verification
- Payment status management
- Order creation after successful payment
- Payment failure handling

### Payment Flow
```
Cart
  ↓
Checkout
  ↓
Apply Coupon
  ↓
Calculate Final Amount
  ↓
Create Order / Payment
  ↓
Razorpay Checkout
  ↓
Payment Verification
  ↓
Order Confirmation
```
---

## 🎟️ Coupons

Customers can:

- Apply valid coupons
- Remove applied coupons
- Receive discount calculations
- Get validation feedback
- Use coupons according to configured conditions

The admin can:

- Create coupons
- Update coupons
- Delete coupons
- Configure discount values
- Configure coupon validity
- Manage coupon availability

---

## 📦 Orders

Customers can:

- Place orders
- View personal orders
- View individual order details
- Track order status
- Cancel eligible orders
- View payment information
- View ordered products
- View shipping information
- View pricing and order totals


### Order Lifecycle
```
Pending
   ↓
Confirmed
   ↓
Processing
   ↓
Shipped
   ↓
Delivered
```
---


# 👨‍💼 Admin Dashboard

Mimi & Me includes a dedicated administrative interface protected by role-based authorization.


## 📊 Dashboard

- Total users
- Total products
- Total orders
- Pending orders
- Delivered orders
- Revenue overview


## 📦 Product Management

- Create products
- Update products
- Delete products
- Manage product information
- Manage pricing
- Manage discounts
- Manage stock
- Manage sizes and colors
- Upload product images


## 🚚 Order Management

- View all orders
- View order information
- Update order status
- Monitor payment status
- Manage order lifecycle


## 👥 User Management

- View registered users
- View user information
- View account creation dates
- Identify user/admin roles
- Delete eligible users


## 🎟️ Coupon Management

- Create coupons
- Update coupons
- Delete coupons
- Configure discount rules
- Manage coupon validity

---

# 🔒 Security & Validation

The application implements several security and reliability practices:

- JWT-based authentication
- HTTP-only authentication cookies
- Password hashing with bcrypt
- Protected API routes
- Role-based authorization
- Admin-only endpoints
- Request validation with Zod
- Input validation
- Authentication middleware
- Centralized error handling
- Protected user resources
- Environment-based configuration
- Sensitive credentials excluded from source control

---


# ☁️ Media Management

Product and category images are handled through **Cloudinary**.

### Image Flow
```
Admin Upload
     ↓
Multer
     ↓
Cloudinary
     ↓
Image URL + Public ID
     ↓
MongoDB
     ↓
Frontend
```
---

# 🏗️ Architecture

Mimi & Me follows a modular client-server architecture.


## Frontend Architecture
```
Page
 ↓
Zustand Store
 ↓
API Service
 ↓
Axios
 ↓
Backend REST API
```

## Backend Architecture
```
Route
 ↓
Middleware
 ↓
Controller
 ↓
Model
 ↓
MongoDB
```
---

## High-Level Architecture

                    ┌──────────────────┐
                    │     Customer     │
                    │    / Admin UI    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React + Vite     │
                    │ Tailwind CSS     │
                    │ Zustand          │
                    └────────┬─────────┘
                             │
                          REST API
                             │
                             ▼
                    ┌──────────────────┐
                    │ Node.js          │
                    │ Express.js       │
                    │ Middleware       │
                    │ Controllers      │
                    └───────┬──────────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
        ┌─────────────────┐   ┌─────────────────┐
        │ MongoDB Atlas   │   │   Cloudinary    │
        │ Application DB  │   │ Media Storage   │
        └─────────────────┘   └─────────────────┘
                            │
                            ▼
                    ┌─────────────────┐
                    │    Razorpay     │
                    │    Payments     │
                    └─────────────────┘

---

# 🧰 Tech Stack

## Frontend
```
| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Frontend tooling & development |
| Tailwind CSS | Styling & responsive design |
| Zustand | Global state management |
| React Router | Client-side routing |
| Axios | API communication |
| Lucide React | UI icons |
| React Hot Toast | Notifications |
```
## Backend
```
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | REST API framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Zod | Request validation |
| Multer | File upload handling |
| Nodemailer | Email delivery |
| Razorpay | Payment processing |
| Cloudinary | Image/media storage |
| dotenv | Environment configuration |
```
---

# 🗂️ Project Structure
```
Mimi-Me/
│
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── store/
│       ├── routes/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── app.js
│   │
│   └── server.js
│
├── .gitignore
└── README.md
```

# 🔄 State Management

Global application state is managed using **Zustand**.

Major stores include:
authStore
productStore
categoryStore
cartStore
wishlistStore
orderStore
couponStore


# 🌐 REST API

The backend exposes RESTful endpoints for major application domains.
/api/auth
/api/products
/api/categories
/api/cart
/api/wishlist
/api/orders
/api/coupons
/api/admin
/api/users

# 🧪 Testing & Quality

The project went through dedicated production-readiness and responsive testing phases covering:

- Authentication flows
- Product workflows
- Cart operations
- Wishlist operations
- Checkout
- Payment flow
- Coupon functionality
- Order lifecycle
- User account functionality
- Admin functionality
- API protection
- Responsive layouts
- Desktop layouts
- Tablet layouts
- Mobile layouts
- Production frontend/backend integration

---

# 🚀 Deployment

The application is deployed using a separated frontend/backend architecture.

Frontend
   │
   └── Vercel
          │
          ▼
       REST API
          │
          ▼
Backend
   │
   └── Render
          │
          ├── MongoDB Atlas
          ├── Cloudinary
          └── Razorpay


# ⚙️ Local Development

## 1. Clone the repository

```bash
git clone <your-repository-url>

cd Mimi-Me
````

## 2. Install dependencies

### Frontend

```bash
cd client
npm install
```

### Backend

```bash
cd ../server
npm install
```

## 3. Configure Environment Variables

Create `.env` files according to the required frontend and backend configuration.

Example backend configuration:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

BREVO_API_KEY=your_brevo_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

EMAIL_USER=your_email
```

> Never commit real credentials, API keys, secrets, or `.env` files to the repository.

## 4. Start the Backend

```bash
cd server
npm start
```

## 5. Start the Frontend

```bash
cd client
npm run dev
```

```
```

# 📌 Development Principles

The project was developed around the following principles:

- Modular architecture
- Separation of concerns
- Reusable components
- Centralized API services
- Centralized state management
- Protected resources
- Input validation
- Consistent error handling
- Responsive-first UI
- Environment-based configuration
- Maintainable folder structure
- Production-oriented development practices

# 📈 Project Development Journey

Mimi & Me was developed through structured implementation phases:

```text
Phase 1  → Code Quality & Refactoring
Phase 2  → Payment System
Phase 3  → Coupons System
Phase 4  → User Profile & Account
Phase 5  → UI/UX Enhancement
Phase 6  → Responsive & E2E Testing
Phase 7  → Information & Support Pages
Phase 8  → Production Readiness Audit
Phase 9  → Deployment & Production
Phase 10 → Documentation & Portfolio
```

# 🔮 Future Improvements

Potential future iterations may include:

- Advanced product recommendations
- More powerful search
- Advanced analytics
- Sales reporting
- Product reviews and ratings
- Inventory alerts
- Automated email notifications
- Order tracking integrations
- Performance optimizations
- Additional payment methods
- Progressive Web App capabilities


# 📚 What This Project Demonstrates

Mimi & Me demonstrates practical experience with:

- Full-stack MERN development
- REST API architecture
- Authentication & authorization
- JWT and HTTP-only cookies
- MongoDB data modeling
- Zustand state management
- Payment gateway integration
- Cloud media management
- Email-based authentication
- Request validation
- Role-based access control
- Admin dashboard development
- Responsive UI engineering
- Production deployment
- End-to-end application development


# 👨‍💻 Author

**Shourya Gaur**

B.Tech — Computer Science & Engineering

Built with React, Node.js, Express, MongoDB, and a focus on clean, scalable full-stack development.

---

## 📄 License

This project is intended for educational, portfolio, and demonstration purposes.
