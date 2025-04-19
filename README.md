
# 🚀 DevOps Monitoring Dashboard

A modern, responsive DevOps Monitoring Dashboard built with **React.js**. This dashboard visualizes critical system metrics (CPU, memory, disk, network, API performance, security, deployments, and alerts) and integrates a full CI/CD pipeline using **GitHub Actions** for automated testing and deployment to AWS S3 or Netlify.
![Screenshot 2025-04-19 185107](https://github.com/user-attachments/assets/57ef8826-e796-4070-bb18-5423628386fe)



---

## 👥 Team

- **[Saanvi Sharma]** ([22BCE11027])
- **[Harsh Dayal]** ([22BCE10564])

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [CI/CD Pipeline](#cicd-pipeline)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Learning Outcomes](#learning-outcomes)
- [License](#license)

---

## 📈 Project Overview

This project demonstrates a full DevOps workflow:
- Real-time system monitoring dashboard for performance, security, and deployment status.
- Automated CI/CD pipeline using GitHub Actions.
- One-click deployment to AWS S3 or Netlify.

---

## ✨ Features

- **Live Metrics:** CPU, Memory, Disk, Network I/O, API performance.
- **Service Health:** Authentication, Payment Gateway, User Management, Data Processing.
- **Security Monitoring:** Score, active threats, recent mitigations.
- **Deployment Tracking:** Recent deployments and their statuses.
- **Error Logging:** Latest log errors with context.
- **System Alerts:** Real-time critical alerts.
- **Dark/Light Mode Toggle**
- **CI/CD Status Indicator**

---

## 🛠️ Tech Stack

| Layer      | Technology           |
|------------|---------------------|
| Frontend   | React.js, HTML5, CSS3, Chart.js |
| DevOps     | Git, GitHub Actions, ESLint, Jest |
| Deployment | Netlify     |

---

## 🏗️ Architecture

- **Modular React Components** for each dashboard widget.
- **API Integrations** for real-time data (mocked/sample data for demo).
- **Responsive UI** for desktop and mobile.
- **CI/CD Workflow** in `.github/workflows/ci-cd.yml`.

---

## 🔄 CI/CD Pipeline

- **Linting:** Automated code style checks with ESLint.
- **Testing:** Unit/component tests with Jest and React Testing Library.
- **Build:** Production build on every push to `main`.
- **Deploy:** Automatic deployment to AWS S3 or Netlify on successful build.

**Example Workflow:**
```
on:
  push:
    branches: [ main ]
jobs:
  build_and_test:
    ...
  deploy:
    ...
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```
   git clone https://github.com/confusedjpeg/devops_project.git
   cd devops_project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run locally:**
   ```
   npm start
   ```

4. **Run tests:**
   ```
   npm test
   ```

---

## ☁️ Deployment

### Netlify

- Connect GitHub repo to Netlify and set build command to `npm run build`.
- Set publish directory to `build/`.

---

## 🎓 Learning Outcomes

- Hands-on experience with CI/CD pipelines and automation.
- Integration of version control with deployment.
- Real-world monitoring dashboard design and implementation.
- Secure secrets management and cloud deployment.

---

## 📄 License

This project is for educational purposes.

---

> For any questions or contributions, please open an issue or pull request!

