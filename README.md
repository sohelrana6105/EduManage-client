<!-- Banner (replace with your banner URL) -->

![EduManage Banner](https://raw.githubusercontent.com/sohelrana6105/EduManage-client/main/src/assets/Edu_banner.png)


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
- Mongodb
- jsonwebtoken
- cors
- dotenv
- nodemon (dev)

# Sign in / Login 
**Admin** <br>
Email    : dev.sohelranas@gmail.com  <br>
Password :Devsohel209195

**Teacher** <br>
Email    : masud@gmail.com  <br> 
Password : masud123@@

**Student** <br>
Email    : nawazshorif@gmail.com  <br>
Password : nawaz123@@


# Installation 
**Git clone Clone frontend**   <br>  
```bash
https://github.com/sohelrana6105/EduManage-client.git

  <br>
cd EduManage-client 

# Clone backend (in another folder)
**Git clone backend** <br>

https://github.com/sohelrana6105/EduManage-server.git
 <br>
cd EduManage-server 



