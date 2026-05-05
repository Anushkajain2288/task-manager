# 🧠 Team Task Manager (Full Stack)

A full-stack web application to manage tasks, assign work, and track progress with role-based access (Admin / Member).

---

## 🚀 Features

* 🔐 Authentication (Signup / Login)
* 👥 Role-based access (Admin / Member)
* 📋 Create, assign, and delete tasks
* ✅ Mark tasks as done
* ⏰ Due date + overdue indicator
* 👤 Assign tasks to specific users
* 📊 Dashboard view of tasks

---

## 🛠️ Tech Stack

**Frontend:**

* HTML
* CSS
* JavaScript

**Backend:**

* Node.js
* Express.js

**Database:**

* MongoDB

---

## 📂 Project Structure

```
task-manager/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── dashboard.html
│   ├── script.js
│   └── style.css
│
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/Anushkajain2288/task-manager.git
cd task-manager
```

### 2️⃣ Install dependencies

```

cd backend
npm install
```

### 3️⃣ Start backend server

```
npx nodemon server.js
```

Server runs on:

```
http://localhost:5000
```

### 4️⃣ Run frontend

Open:

```
frontend/index.html
```

---

## 🔑 Roles

### 👑 Admin

* Create tasks
* Assign tasks
* Delete tasks

### 👤 Member

* View assigned tasks
* Mark tasks as done

---

## 🌐 API Endpoints

### Auth

* POST `/api/auth/signup`
* POST `/api/auth/login`

### Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/:id`
* DELETE `/api/tasks/:id`

---




