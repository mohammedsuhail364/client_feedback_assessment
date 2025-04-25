# 🗣️ Client Feedback Portal

A full-stack web application for users to submit feedback and for admins to manage, filter, and comment on those feedback entries. Built with the MERN stack and styled with TailwindCSS & ShadCN UI, featuring Framer Motion animations for a smooth user experience.

---

## 🚀 Tech Stack

**Frontend**  
- React.js  
- Tailwind CSS + ShadCN UI  
- Framer Motion (animations)  
- React Router  
- js-cookie (auth)

**Backend**  
- Node.js + Express  
- MongoDB + Mongoose  
- Multer (file uploads)  
- JSON Web Token (JWT)

---

## ✨ Features

### 🧑‍💻 User
- Submit feedback with:
  - Text
  - Rating (1 to 5)
  - Optional image
- Authentication via JWT
- Automatically redirected to dashboard if admin

### 🛡️ Admin
- Protected admin dashboard
- Filter feedback by rating
- Sort feedback by date (Newest ↔ Oldest)
- View all user-submitted feedback with images
- Add admin comments
- Logout functionality

---

## 🛠️ Setup Instructions

### ⚙️ Backend

```bash
cd backend
npm install
```
Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

Run the server:

npm run dev

💻 Frontend

cd frontend
npm install
npm run dev

📂 Folder Structure

client-feedback-portal/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── ...

🧪 Upcoming Improvements

Search feedback by keyword

Filter by date range

Paginated feedback list

User dashboard for past submissions

Email notifications on new feedback

📄 License

This project is licensed under the MIT License.


---

Let me know if you want to include:
- Demo GIFs
- Deploy instructions (like Vercel + Render)
- Docker setup  
- Contribution guidelines

Happy shipping! 🚢
