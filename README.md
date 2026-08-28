# Reflex
Reflex is a real-time Delivery Management System designed to streamline logisitics and last-mile delivery operations. It bridges the gap between store owners, operations dispatchers, and field riders through role-specific workflows and real-time tracking.

# Reflex – Real-Time Delivery Management System

Reflex is an end-to-end delivery management platform built with the MERN stack (MongoDB/PostgreSQL, Express, React, Node.js). The system orchestrates communication and logistics management across three core operational roles: Retailers, Dispatchers, and Riders.

---

## 🚀 Features

### 🛒 Retailers
* Create and manage customer profiles and delivery orders.
* Add catalog line items, set pickup/drop-off locations, and track order fulfillment.
* View status histories and delivery receipts.

### 📋 Dispatchers
* Monitor unassigned delivery queues.
* Assign or reassign deliveries to available riders based on capacity and vehicle type.
* Monitor live rider movement and handle delivery cancellations or exceptions.

### 🚚 Riders
* View active delivery assignments and routing instructions.
* Update delivery progress (*Picked Up*, *Out for Delivery*, *Delivered*, *Cancelled*).
* Capture Proof of Delivery (POD) including photos and recipient signatures.
* Stream real-time GPS locations during active deliveries.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Tailwind CSS, Lucide React, Socket.io-client
* **Backend:** Node.js, Express.js, Socket.io
* **Database:** PostgreSQL (with Prisma/Sequelize ORM) or MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT), Bcrypt
* **File Storage:** Cloudinary / AWS S3 (Proof of Delivery Photo Uploads)

---

## 🗄️ Database Schema & Entities

The core database design includes the following entities:
* `User`, `Role`, `Retailer`, `Dispatcher`, `Rider` (Identity & RBAC)
* `Customer`, `Item` (Master catalogs)
* `Delivery`, `DeliveryItem` (Order management)
* `Assignment` (Dispatch operations)
* `DeliveryStatusHistory` (Audit trail & location logs)
* `ProofOfDelivery` (Handover confirmation)

---

## 📦 Project Setup

### Prerequisites
* Node.js (v18+)
* PostgreSQL or MongoDB
* Cloudinary or AWS S3 credentials (for POD photo uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/reflex-delivery.git](https://github.com/your-username/reflex-delivery.git)
   cd reflex-delivery
