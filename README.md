# 🚀 FlowDesk — Multi-Tenant SaaS Project Management System

A full-stack MERN SaaS application that allows teams to manage projects, assign tasks, and collaborate with role-based access control in a multi-tenant environment.

🌐 **Live Demo:** (add after deploy)

<!-- ---

## 👤 Demo Account

**Admin**
Email: admin@test.com  
Password: 123456  

**Manager / Member**
(Create via Users panel after login)

--- -->
---
## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-Based Access Control (Admin, Manager, Member)
- Protected routes (frontend + backend)

### 🏢 Multi-Tenancy
- Each company (tenant) has isolated data
- Users belong to a specific organization
- Secure tenant-based data filtering

### 📁 Project Management
- Create, update, delete projects
- Assign members to projects
- Tenant-safe project isolation

### ✅ Task Management
- Create and assign tasks
- Task status workflow:
  - Todo → In Progress → Done
- Priority levels (Low, Medium, High)
- Task filtering & pagination

### 👥 Team Management
- Admin can invite users
- Assign roles (Manager / Member)
- Role-based UI & API restrictions

### 📊 Dashboard
- Task statistics overview
- Recent assigned tasks
- Personalized "My Tasks" view

### 🧾 Task Detail Modal
- View full task details
- Update task status via popup
- Real-time UI updates

### 🎨 Modern UI
- Sidebar + Navbar layout
- Responsive design (Tailwind CSS)
- Clean SaaS-style dashboard
- Interactive cards & modals

---

## 🛠 Tech Stack

### Frontend
- React (Hooks, Context API)
- React Router
- Tailwind CSS
- Vite
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt (password hashing)

---

## ⚙️ Key Concepts Implemented

- Multi-tenant architecture (tenantId-based isolation)
- Role-Based Access Control (RBAC)
- RESTful API design
- Secure authentication with JWT
- Protected routes (frontend + backend)
- Pagination & filtering
- Async error handling middleware
- Modular backend architecture
- Modern UI/UX patterns (sidebar, modals)

---

## 📂 Project Structure

```text
workflow-saas/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── hooks/
│   └── index.html
│
└── README.md
```

---
## 🧪 Run Locally

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---
## 📌 Summary  

This project demonstrates building a production-ready SaaS application with:

Multi-tenancy architecture
Role-based access control
Scalable backend design
Modern frontend UI/UX
Real-world project & task management workflows

## 🚀 Future Improvements
Real-time notifications (WebSockets)

File attachments in tasks

Activity logs & audit trail

Project-level roles & permissions

Email invitations system