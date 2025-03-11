# E-Commerce REST API

## Overview
This is a RESTful API for an e-commerce platform built using **Node.js (Express.js)** and **PostgreSQL (Sequelize ORM)**. It supports **user authentication, product management, category management, shopping cart functionality, order processing, and product filtering**. Additionally, it integrates **Cloudinary** for image uploads and provides **Swagger documentation** for easy API reference.

## Features
- **User Authentication & Authorization**: JWT-based authentication with role-based access control (Admin & Customer).
- **Product Management**: CRUD operations for products with category assignment and image upload.
- **Category Management**: CRUD operations for product categories.
- **Shopping Cart**: Add, remove, and view cart items.
- **Order Processing**: Customers can place orders and view their order history.
- **Product Filtering**: Search and filter products by name, category, and price range.
- **Cloudinary Integration**: Secure image uploads for product images.
- **API Security**: Helmet & CORS for enhanced security.
- **Swagger API Documentation**.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer + Cloudinary
- **Validation**: express-validator
- **API Documentation**: Swagger

---

## Installation & Setup

### Prerequisites
- Node.js (v14+ recommended)
- PostgreSQL (Ensure a database is created)
- Cloudinary account (for image uploads)

### 1. Clone the Repository
```sh
git clone https://github.com/your-repo/e-commerce-api.git
cd e-commerce-api
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root and add the following variables:

```sh
PORT=3000
DATABASE_URL=postgres://username:password@localhost:5432/ecommerce_db
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Start the Server
```sh
npm start
```
The server will start on `http://localhost:3000/`

---

## API Endpoints

### 1. Authentication
| Method | Endpoint        | Description         | Access |
|--------|----------------|---------------------|--------|
| POST   | /api/auth/signup | User registration  | Public |
| POST   | /api/auth/login  | User login (JWT)   | Public |

### 2. Products
| Method | Endpoint            | Description             | Access       |
|--------|---------------------|-------------------------|--------------|
| GET    | /api/products       | List all products      | Public       |
| POST   | /api/products       | Create new product     | Admin Only   |
| PUT    | /api/products/:id   | Update product details | Admin Only   |
| DELETE | /api/products/:id   | Delete product         | Admin Only   |

### 3. Categories
| Method | Endpoint            | Description             | Access       |
|--------|---------------------|-------------------------|--------------|
| GET    | /api/categories     | List all categories    | Public       |
| POST   | /api/categories     | Create new category    | Admin Only   |
| PUT    | /api/categories/:id | Update category        | Admin Only   |
| DELETE | /api/categories/:id | Delete category        | Admin Only   |

### 4. Cart
| Method | Endpoint        | Description               | Access  |
|--------|----------------|---------------------------|---------|
| GET    | /api/cart       | View cart items          | Authenticated Users |
| POST   | /api/cart/add   | Add item to cart         | Authenticated Users |
| DELETE | /api/cart/:id   | Remove item from cart    | Authenticated Users |

### 5. Orders
| Method | Endpoint       | Description             | Access  |
|--------|---------------|-------------------------|---------|
| POST   | /api/orders   | Place an order          | Authenticated Users |
| GET    | /api/orders   | View order history      | Authenticated Users |

---

## Database Schema

### User Model
```js
User.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('Admin', 'Customer'), defaultValue: 'Customer' }
});
```

### Product Model
```js
Product.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  imageUrl: { type: DataTypes.STRING },
  CategoryId: { type: DataTypes.INTEGER, allowNull: false }
});
```

---

## Security & Best Practices
- **JWT Authentication**: All protected routes require a valid JWT.
- **Role-Based Authorization**: Only Admin users can manage products & categories.
- **Input Validation**: express-validator ensures valid data submission.
- **Secure Headers**: Helmet middleware adds security headers.
- **CORS Handling**: CORS middleware prevents unauthorized API access.
- **Environment Variables**: Sensitive information is stored in `.env`.

---

## API Documentation
Swagger documentation is available at:
```
http://localhost:3000/api-docs
```

---

## Deployment
To deploy using **Docker**:
```sh
docker build -t ecommerce-api .
docker run -p 3000:3000 ecommerce-api
```

---

## Conclusion
This API provides a **scalable, secure, and feature-rich** e-commerce backend. Feel free to extend functionalities such as payment integration, user profiles, and more!
