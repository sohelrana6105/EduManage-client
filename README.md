<!-- Banner (replace with your banner URL) -->
![EduManage Banner](./assets/banner-1600x400.png)

# EduManage — Educational Platform (MERN / Next.js)
**Live Demo:** [https://your-edumanage-frontend.example.com  ](https://edumanage-55a3a.web.app/)  <br>
**Backend API:** [https://your-edumanage-api.example.com](https://vercel.com/sohel-ranas-projects-b38da51f/edu-manage-server)

A full-featured educational platform with separate **Admin**, **Teacher**, and **Student** dashboards. EduManage supports class creation & approval flows, enrollments, assignments & submissions, and teaching evaluation feedback.

---

# Description
EduManage is a scalable educational management system (MERN / Next.js + Express + MongoDB) built to manage courses, enrollments, assignments, and evaluations. It includes role-based dashboards for Admin, Teacher, and Student with secure authentication and CRUD flows.

**Short overview**
- Role-based access: **Admin**, **Teacher**, **Student**.
- Teachers can create classes, add assignments, and view submissions.
- Students can enroll in classes, view assignments, and submit work.
- Admin verifies classes, manages users, and sees summary stats.

---

# Technologies Used
- **Frontend:** Next.js (app/router) or React, React Router (if not Next.js), Tailwind CSS, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB (Atlas), Mongoose


---

# Key Features (Core)
- 🔐 Role-based Authentication (Admin / Teacher / Student)
- 🧭 Admin dashboard: user management, class approvals, **/admin/summary-stats** endpoint for aggregate metrics
- 👩‍🏫 Teacher dashboard: Add Class (title/description/price/image), Update/Delete classes, "My Class" page, Add Assignment (title, deadline, description)
- 👨‍🎓 Student dashboard: My Enrolled Classes, Class Details (assignments), Assignment submission form
- 📝 Teaching Evaluation Report (TER) modal: students can give feedback and rating; feedback saved and displayed in the platform
- 📊 Admin summary stats: total users, total classes, total enrollments (single performant route)
- ⚙️ Environment-driven configuration and secure API
- ✅ Responsive UI and client-side validations

---

# Project Structure 

---

# Screenshots
Add clean screenshots in `/client/public/screenshots` or `/screenshots` and link them below:

![Dashboard Screenshot](./screenshots/dashboard-home.png)
![Teacher - My Classes](./screenshots/teacher-my-classes.png)
![Student - Class Details](./screenshots/student-class-details.png)

*(Replace images above with real screenshots — 1280×720 PNG recommended.)*

---

# API (important endpoints)
> Base path: `/api` (or as configured)

- `POST /api/auth/register` — register user (role: student/teacher)
- `POST /api/auth/login` — login -> returns JWT
- `GET /api/classes` — list classes
- `POST /api/classes` — teacher creates class (protected)
- `PUT /api/classes/:id` — update class (teacher / admin)
- `DELETE /api/classes/:id` — delete class (teacher / admin)
- `POST /api/classes/:id/assignments` — add assignment to class
- `POST /api/classes/:id/enroll` — enroll student
- `POST /api/classes/:id/submissions` — student submits assignment
- `POST /api/feedback` — student feedback / TER
- `GET /api/admin/summary-stats` — admin summary statistics (single performant route)

*(Adjust depending on your exact route names — these are representative.)*

---

# Dependencies (major)
**Client (frontend)** — see `client/package.json`
- react / next / react-dom
- axios
- tailwindcss
- framer-motion
- react-hook-form (optional)
- date-fns or dayjs

**Server (backend)** — see `server/package.json`
- express
- mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- multer or cloudinary SDK (for image uploads)
- nodemon (dev)

---

# Environment Variables
Create `.env` files in `server/` and `client/` as shown.

**Server `.env`**
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/edumanage
JWT_SECRET=your_jwt_secret_here
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
FRONTEND_URL=https://your-edumanage-frontend.example.com

