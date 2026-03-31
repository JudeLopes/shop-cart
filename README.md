# ShopCart

ShopCart is a full-stack e-commerce web application featuring a modern React frontend and a robust Node.js/Express backend with a MySQL database.

## Features

- **Product Catalog & Details**: Browse products, view detailed information with images, and explore categories.
- **User Authentication**: Register and log in using an email and password.
- **Shopping Cart**: Add items, update quantities, and remove items from the cart.
- **Checkout & Orders**: Place orders into a relational database, apply discount coupons, and calculate final pricing.
- **Order History**: Check your past orders and see detailed order items.
- **User Profile & Addresses**: Manage user shipping addresses and select default addresses.
- **Wishlist**: Save favorite products for later.
- **Reviews & Ratings**: Read product reviews and add your own.

## Tech Stack

### Frontend (Client)
- **Framework**: [React](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (powered by Radix UI)
- **Data Fetching**: [React Query](https://tanstack.com/query/latest)
- **Routing**: React Router DOM

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Web Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/) with `mysql2` client
- **Database Architecture**: Uses SQL stored procedures for critical logic (like calculating discounts and placing orders).

## Prerequisites

- **Node.js**: Ensure Node.js and npm are installed.
- **MySQL**: A running MySQL server instance.

## Installation & Setup

### 1. Database Setup

1. Open your MySQL client or command line.
2. Create a database named `online_shopping`:
   ```sql
   CREATE DATABASE online_shopping;
   ```
3. Import the provided SQL schema from the project root:
   ```sh
   mysql -u root -p online_shopping < online_shopping.sql
   ```
*(Note: If you have a different MySQL user or password, specify them accordingly.)*

### 2. Backend Setup

1. Navigate to the `server` directory:
   ```sh
   cd server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Update the database connection credentials in `server.js` (or ensure your environment corresponds to `user:"root"` and `password:""`).
4. Start the backend server:
   ```sh
   npm start
   ```
   *The server will run on `http://localhost:5000`.*

### 3. Frontend Setup

1. Open a new terminal and navigate to the `client` directory:
   ```sh
   cd client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

- `/client` - Complete Vite-based React frontend source code.
- `/server` - Express backend API and SQL utility scripts.
- `online_shopping.sql` - The MySQL database schema definition and sample data.

## Useful Scripts

### Client
- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Bundles the application for production deployment.
- `npm run preview`: Previews the optimized production build locally.

### Server
- `npm start`: Starts the Express server using Node.
