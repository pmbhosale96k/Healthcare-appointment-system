# 🏥 Hospital Management System

A full-stack Hospital Management System built using **Spring Boot**, **React**, and **MySQL**. The application streamlines hospital operations by enabling patients to book appointments, doctors to manage schedules, and administrators to oversee the entire system through role-based dashboards.

---

## 🚀 Features

### 👨‍⚕️ Patient
- User Registration & Login
- Secure JWT Authentication
- Book Appointments
- View Appointment History
- Update Profile

### 🩺 Doctor
- Doctor Login
- View Assigned Appointments
- Manage Appointment Status
- View Patient Details

### 👨‍💼 Admin
- Manage Doctors
- Manage Patients
- Monitor Appointments
- Dashboard Analytics

---

## 🛠 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- REST APIs

### Frontend
- React
- JavaScript
- HTML5
- CSS3

### Database
- MySQL

### Tools
- Maven
- Git & GitHub
- Postman
- Docker


## 🔐 Authentication

- JWT-based Authentication
- Role-Based Authorization
- Secure Password Encryption
- Protected REST APIs

---

## 📌 REST API Modules

- Authentication
- Patient Management
- Doctor Management
- Appointment Management
- Admin Dashboard

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/healthcare-app.git
```

### Backend

```bash
cd healthcare-app
mvn clean install
mvn spring-boot:run
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🗄 Database Configuration

Update the database credentials in:

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=root
spring.datasource.password=your_password
```

---

## 📷 Screenshots

> Add screenshots of:

- Login Page
![alt text](image-1.png)
- Patient Dashboard
- Doctor Dashboard
![alt text](image-4.png)

- Admin Dashboard
![alt text](image-2.png)
![alt text](image-3.png)
![alt text](image-5.png)
- Appointment Booking

---

## 🔮 Future Enhancements

- Email Notifications
- Online Payment Integration
- Medical Records Management
- Video Consultation
- AI Chat Assistant

---

## 👨‍💻 My Contributions

- Developed Spring Boot backend architecture.
- Implemented JWT Authentication and Spring Security.
- Designed REST APIs for authentication and appointment management.
- Configured JPA/Hibernate with MySQL.
- Integrated frontend with backend APIs.
- Containerized the application using Docker.

---

## 📬 Contact

**Pratham Bhosale**

- LinkedIn: https://linkedin.com/in/your-profile
- GitHub: https://github.com/your-username
- Email: your-email@example.com