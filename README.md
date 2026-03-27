# Job Portal Frontend (React.js + Tailwind CSS)

## 📌 Overview

This is the frontend of the Job Portal application built using React.js and Tailwind CSS. It provides a modern, responsive user interface for job seekers and admins to interact with the platform seamlessly.

The frontend communicates with the backend APIs for authentication, job listings, and job applications.

## ✨ Features
## 👤 User Functionalities
1. 🔍 Browse all available jobs
2. 📄 View detailed job descriptions
3. 📝 Apply for jobs with required details
4. 📂 View "My Applications"
5. 🔐 Login / Register / Logout
6. 🔑 Forgot & Reset Password


## 🛠️ Admin Functionalities
1. ➕ Create new job listings
2. 📋 View all jobs in table format (Ka Table)
3. ✏️ Edit job details
4. ❌ Delete jobs
5. 📊 Manage job applications

## 🧱 Tech Stack
1. ⚛️ React.js
2. 🎨 Tailwind CSS
3. 🔗 Axios (API calls)
4. 📊 Ka Table (Admin table management)
5. 🔐 JWT Authentication (via backend)
6. 🌐 React Router DOM

## 🔐 Authentication Flow
1. User logs in → JWT token stored (localStorage)
2. Token is sent in headers for protected routes:
    Authorization: Bearer <token>
       >> Protected routes handled using custom ProtectedRoute component

## 🔄 Application Flow
1. User visits homepage
2. Views job listings
3. Clicks job → sees details
4. Applies for job
5. Tracks application in "My Applications"
6. Save and Unsave Your Job
7. Admin manages jobs from dashboard

## 🚀 Future Improvements
1. Advanced filters & search
2. Pagination UI
3. Resume upload (file handling)
4. Dark mode support
5. Notifications system

Demo Link: https://careeratextraatech.netlify.app/
