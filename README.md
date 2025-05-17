# Employee Management CRUD Web App

A simple full‑stack Employee Management system built with  
**Node.js · Express · MongoDB (Mongoose) · EJS · Bootstrap**.  
It supports basic admin login and full CRUD (Create, Read, Update, Delete) operations on employee records.

---

## ✨ Features

| Module | Details |
|--------|---------|
| Authentication | Single admin login (`admin@example.com` / `admin123`) using **express‑session** & **connect‑flash** |
| Views | Server‑side rendering with **EJS** + Bootstrap 5 |
| CRUD | Employees: add, list, edit, delete |
| Validation | Required‑field checks on create/update routes |
| Flash Messages | Success & error toasts on all actions |
| Deployment | Ready for **Render** + **MongoDB Atlas** (or any Node host) |

---

## 📂 Folder Structure

employee-management/
├── models/
│ └── Employee.js
├── routes/
│ ├── auth.js
│ └── employees.js
├── middleware/
│ └── auth.js
├── views/
│ ├── index.ejs
│ ├── new.ejs
│ ├── edit.ejs
│ ├── login.ejs
│ └── dashboard.ejs
├── .env.example
├── server.js
└── package.json

---

## 🚀 Quick Start (Local)

```bash
# 1. Clone & install
git clone https://github.com/<your‑user>/employee-management.git
cd employee-management
npm install

# 2. Create .env from sample
cp .env.example .env
#   └─ edit MONGO_URI with your local Mongo (or Atlas) string
#   └─ edit PORT if you like (default 3000)

# 3. Run dev server with auto‑reload
npm run dev

# 4. Browse
open http://localhost:3000/login
# login: admin@example.com / admin123


🛠️ Environment Variables
| Key              | Example Value                                    | Notes                                          |
| ---------------- | ------------------------------------------------ | ---------------------------------------------- |
| `PORT`           | `3000`                                           | optional – default 3000                        |
| `MONGO_URI`      | `mongodb://localhost:27017/empdb` *or* Atlas URI | **required**                                   |
| `SESSION_SECRET` | `mySuperSecret`                                  | optional – falls back to `'secretKey'` in code |

Create them in .env (for local) or your cloud provider’s dashboard.


📝 API / Routes

| Method & Path                | Auth? | Purpose                      |
| ---------------------------- | ----- | ---------------------------- |
| `GET  /login`                | ❌     | Login page                   |
| `POST /login`                | ❌     | Login action                 |
| `GET  /logout`               | ✅     | Destroy session and redirect |
| `GET  /employees`            | ✅     | List employees               |
| `GET  /employees/new`        | ✅     | “Add employee” form          |
| `POST /employees`            | ✅     | Create employee              |
| `GET  /employees/edit/:id`   | ✅     | Edit form                    |
| `POST /employees/edit/:id`   | ✅     | Update employee              |
| `POST /employees/delete/:id` | ✅     | Delete employee              |


☁️ Deployment Guide (Render + MongoDB Atlas)
MongoDB Atlas

Create free cluster ▸ Network Access ▸ Add IP 0.0.0.0/0 (or specific).

Add database user.

Copy SRV connection string and set database name (e.g., empdb).

Push to GitHub

Render

New ▸ Web Service ▸ connect repo.

Build = npm install (auto).

Start = npm start.

Add env vars MONGO_URI, SESSION_SECRET, (optional) PORT.

Deploy & note the public URL.

Test

Visit /login, sign in, create employees—done!

📚 Scripts
Command	Purpose
npm run dev	Start with nodemon for live reload
npm start	Start in production mode

🤝 Contributing
PRs are welcome! For major changes, open an issue first to discuss what you’d like to change.


---

### How to use

1. Copy the block above into a file named **`README.md`** in the project root.
2. Optionally replace the GitHub URL, tweak wording, or add screenshots/badges.

You’re all set—this README will satisfy Coursera’s deliverable and guide anyone who clones your repo. 🎉
