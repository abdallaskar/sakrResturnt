# 🍽️ Sakr Restaurant - React E-Commerce App

A simple full-stack restaurant web app built with **React** and **JSON Server**. This app supports authentication (user/admin),      
item listing with filtering, search, pagination, shopping cart functionality, and an admin panel for managing products.

---

## 🌐 Live Demo

- **Source Code**: [🔗 GitHub Repository](https://github.com/abdallaskar/sakrResturnt)

---

## ✨ Features

### 🧑‍💼 Authentication
- Register as user or admin
- Login and protected routes

### 🛍️ User Features
- View all restaurant items
- Filter by category
- Search by name
- Paginated items list
- Add items to cart
- Increase/decrease item quantity
- Remove items from cart
- View total cart amount

### 🛠️ Admin Features
- Access to admin panel
- Add new items
- Edit items
- Delete items

### 📄 Pages
- Home
- Login / Register
- About
- Items List
- Cart
- Admin Panel (Admin only)

---

## 🧰 Tech Stack

| Technology         | Description                       |
|--------------------|-----------------------------------|
| **React**          | UI Library                        |
| **React Router v7**| Page Routing                      |
| **TailwindCSS**    | Utility-first CSS framework       |
| **DaisyUI**        | UI components for Tailwind        |
| **Formik**         | Forms and validation              |
| **React Toastify** | Toast notifications               |
| **Lucide React**   | Icons                             |
| **JSON Server**    | Mock backend with REST API        |
| **json-server-auth** | Simple authentication and roles |

---

## 📦 Project Structure

```bash
sakrResturnt/
├── client/         # React App
│   ├── public/
│   ├── src/
│   └── package.json
├── server/         # JSON Server with Auth
│   ├── db.json
│   └── ...
└── README.md
