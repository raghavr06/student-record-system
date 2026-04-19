# 🎓 Student Record Management System (MERN)

A simple, beginner-friendly full-stack CRUD application built with the **MERN** stack:  
**MongoDB · Express · React · Node.js**

---

## 📁 Project Structure

```
STUDENT RECORD/
├── backend/
│   ├── models/
│   │   └── Student.js       ← Mongoose schema
│   ├── routes/
│   │   └── students.js      ← CRUD API routes
│   ├── .env                 ← MongoDB connection string (fill this in!)
│   ├── .gitignore
│   └── server.js            ← Express entry point (port 5000)
│
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js           ← All React UI + API logic
        └── App.css          ← Styles
```

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v16 or above)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (free tier works)

---

## 🚀 How to Run Locally

### Step 1 — Set Up MongoDB Atlas

1. Log into [MongoDB Atlas](https://cloud.mongodb.com/).
2. Create a free cluster if you don't have one.
3. Go to **Database Access** → Add a database user (username + password).
4. Go to **Network Access** → Allow access from Anywhere (`0.0.0.0/0`).
5. Go to **Clusters** → Click **Connect** → **Connect your application** → Copy the connection string.
   - It looks like: `mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/`

### Step 2 — Configure the Backend

Open `backend/.env` and paste your connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/studentdb?retryWrites=true&w=majority
PORT=5000
```

> ⚠️ Replace `<username>` and `<password>` with your actual Atlas credentials.

### Step 3 — Start the Backend

```bash
cd backend
npm install       # only needed once
npm start
```

You should see:
```
MongoDB connected successfully.
Server running on http://localhost:5000
```

### Step 4 — Start the Frontend

Open a **new terminal window/tab**:

```bash
cd frontend
npm install       # only needed once
npm start
```

The app will open at **http://localhost:3000**.

---

## 🔌 API Endpoints

| Method | URL               | Description          |
|--------|-------------------|----------------------|
| GET    | `/students`       | Get all students     |
| POST   | `/students`       | Create a new student |
| PUT    | `/students/:id`   | Update a student     |
| DELETE | `/students/:id`   | Delete a student     |

---

## 🌐 Environment Variables Summary

| Variable    | File           | Description                |
|-------------|----------------|----------------------------|
| `MONGO_URI` | `backend/.env` | MongoDB Atlas connection string |
| `PORT`      | `backend/.env` | Backend server port (default: 5000) |

---

## ✅ Features

- ➕ Add student (name, roll number, course, age)
- 📋 View all students in a table
- ✏️ Edit/update student details inline
- 🗑️ Delete a student
- Duplicate roll number validation
- Error and success flash messages
