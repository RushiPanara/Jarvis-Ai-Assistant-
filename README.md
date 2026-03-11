<h1 align="center">💰 Money Manager</h1>

<h3 align="center">
Personal Finance Management Web Application
</h3>

<p align="center">
Track Income • Manage Expenses • Monitor Balance
</p>

---

<p align="center">

<img src="https://img.shields.io/badge/Backend-Flask-red?style=for-the-badge">
<img src="https://img.shields.io/badge/Language-Python-yellow?style=for-the-badge">
<img src="https://img.shields.io/badge/Database-Firestore-orange?style=for-the-badge">
<img src="https://img.shields.io/badge/Auth-Firebase-blue?style=for-the-badge">
<img src="https://img.shields.io/badge/Frontend-HTML%20CSS%20JS-green?style=for-the-badge">
<img src="https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge">

</p>

<p align="center">

<img src="https://img.shields.io/badge/Release-v1.0-purple?style=flat-square">
<img src="https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square">

</p>

---

# ✨ Overview

Money Manager is a **simple and secure personal finance web application** that helps users track their **income, expenses, and financial balance**.

The application uses:

• **Flask API Backend**  
• **Firebase Authentication**  
• **Google Firestore Database**

It demonstrates how to build a **real-world financial tracking system with authentication and cloud storage**.

---

# 🚀 Features

💵 Add income transactions  
💳 Add expense transactions  
📊 Automatic balance calculation  
📜 Transaction history tracking  
🔐 Secure user authentication  
☁️ Cloud database storage  

---

# 🏗️ Project Structure

Money-Manager
│
├── api
│ └── index.py # Flask backend API
│
├── templates # HTML frontend pages
│
├── static # CSS / JavaScript files
│
├── vercel.json # Deployment configuration
│
└── README.md


---

# ⚙️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Python | Backend development |
| Flask | REST API |
| Firebase Auth | User authentication |
| Firestore | Cloud database |
| HTML/CSS/JS | Frontend UI |
| Vercel | Deployment |

---

# 🔐 Authentication Flow

1️⃣ User logs in using **Firebase Authentication**

2️⃣ Firebase generates **ID Token**

3️⃣ Token is sent to backend API

4️⃣ Backend verifies token using **Firebase Admin SDK**

5️⃣ Transactions are stored under **user UID in Firestore**

---

# 📡 API Endpoints

### Add Transaction

