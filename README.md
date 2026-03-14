# 🚀 Mini CRM - Customer Relationship Management System

A modern, full-stack Customer Relationship Management (CRM) application built with Spring Boot and React. Manage customers, track leads, and visualize business analytics with a secure, responsive interface.


## ✨ Features

### 🔐 Authentication & Authorization
- Secure JWT-based authentication
- BCrypt password hashing
- Role-based access control
- Session management

### 👥 Customer Management
- Create, read, update, delete customers
- Search and filter customers
- Pagination support
- Customer detail views
- Track customer-related leads

### 📊 Lead Tracking
- Manage sales opportunities
- Lead status workflow: New → Contacted → Converted/Lost
- Assign leads to customers
- Track lead value and descriptions
- Lead analytics and reporting

### 📈 Analytics Dashboard
- Real-time business metrics
- Interactive charts and graphs
- Customer statistics
- Lead conversion rates
- Revenue projections

### 🎨 Modern UI/UX
- Responsive design (mobile, tablet, desktop)
- Professional landing page
- Intuitive navigation
- Clean, modern interface
- Tailwind CSS styling

## 🛠️ Tech Stack

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Application framework
- **Spring Security** - Authentication & authorization
- **Spring Data JPA** - Database access
- **PostgreSQL** - Relational database
- **JWT (0.11.5)** - Token-based authentication
- **Maven** - Build tool
- **Hibernate** - ORM framework

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling framework
- **Recharts** - Data visualization
- **Context API** - State management

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           Presentation Layer (React)            │
│  Landing Page | Dashboard | Customer | Leads    │
└─────────────────────────────────────────────────┘
                      ↓ HTTP/REST
┌─────────────────────────────────────────────────┐
│         Application Layer (Spring Boot)         │
│  Controllers → Services → Repositories          │
└─────────────────────────────────────────────────┘
                      ↓ JPA/Hibernate
┌─────────────────────────────────────────────────┐
│         Data Layer (PostgreSQL)                 │
│  Users | Customers | Leads                      │
└─────────────────────────────────────────────────┘
```

## 📦 Prerequisites

Before running this application, ensure you have:

- **Java Development Kit (JDK) 17** or higher
- **Node.js 16+** and **npm**
- **PostgreSQL 12+** installed and running
- **Maven 3.6+** (or use Maven wrapper)
- **Git** for cloning the repository

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mini-crm.git
cd mini-crm
```

### 2. Database Setup

Create a PostgreSQL database:

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE mini_crm;

-- Create user (optional)
CREATE USER crm_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE mini_crm TO crm_user;

-- Exit
\q
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Configure database connection in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/mini_crm
spring.datasource.username=postgres
spring.datasource.password=your_password
```

Install dependencies and build:

```bash
mvn clean install
```

### 4. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

## ⚙️ Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Application name
spring.application.name=mini-crm

# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/mini_crm
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
jwt.expiration=86400000

# Server Configuration
server.port=8080
server.error.include-message=always

# JSON Configuration
spring.jackson.serialization.fail-on-empty-beans=false
```

### Frontend Configuration

Edit `frontend/src/services/api.js` to set the API base URL:

```javascript
const API_BASE_URL = 'http://localhost:8080';
```

## 🏃 Running the Application

### Option 1: Run Backend and Frontend Separately

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```
Backend will start on http://localhost:8080

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
Frontend will start on http://localhost:3000

### Option 2: Build for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/mini-crm-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Serve the build folder with a static server
npx serve -s build
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123"
}
```

#### Login
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "userId": 1,
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Customer Endpoints (Requires Authentication)

#### Get All Customers
```http
GET /customers
Authorization: Bearer {token}
```

#### Create Customer
```http
POST /customers
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Acme Corp",
  "email": "contact@acme.com",
  "phone": "+1234567890",
  "company": "Acme Corporation"
}
```

#### Get Customer by ID
```http
GET /customers/{id}
Authorization: Bearer {token}
```

#### Update Customer
```http
PUT /customers/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Acme Corp Updated",
  "email": "newemail@acme.com",
  "phone": "+1234567890",
  "company": "Acme Corporation"
}
```

#### Delete Customer
```http
DELETE /customers/{id}
Authorization: Bearer {token}
```

### Lead Endpoints (Requires Authentication)

#### Get All Leads
```http
GET /leads
Authorization: Bearer {token}
```

#### Create Lead
```http
POST /leads
Authorization: Bearer {token}
Content-Type: application/json

{
  "customerId": 1,
  "title": "Software License Deal",
  "description": "Annual license renewal",
  "status": "NEW",
  "value": 5000.00
}
```

#### Update Lead
```http
PUT /leads/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "customerId": 1,
  "title": "Software License Deal",
  "description": "Annual license renewal",
  "status": "CONVERTED",
  "value": 5000.00
}
```

#### Delete Lead
```http
DELETE /leads/{id}
Authorization: Bearer {token}
```

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Customers Table
```sql
CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Leads Table
```sql
CREATE TABLE leads (
    id BIGSERIAL PRIMARY KEY,
    customer_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    value DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Entity Relationships
- **One User** → **Many Customers** (1:N)
- **One Customer** → **Many Leads** (1:N)
- **One User** → **Many Leads** (1:N)

## 🔒 Security

### Authentication Flow
1. User registers with email and password
2. Password is hashed using BCrypt (10 rounds)
3. User logs in with credentials
4. Server validates credentials and generates JWT token
5. Token is sent to client and stored in localStorage
6. Client includes token in Authorization header for protected requests
7. Server validates token on each request

### Security Features
- ✅ JWT-based stateless authentication
- ✅ BCrypt password hashing with salt
- ✅ CORS configuration for frontend
- ✅ Protected API endpoints
- ✅ Token expiration (24 hours)
- ✅ Input validation on all endpoints
- ✅ SQL injection prevention via JPA
- ✅ XSS protection

### Password Requirements
- Minimum 6 characters
- Stored as BCrypt hash (never plain text)
- Automatic salt generation

## 📸 Screenshots

### Landing Page
Beautiful, modern landing page with call-to-action buttons and feature highlights.

### Dashboard
Real-time analytics with charts showing customer metrics, lead statistics, and revenue projections.

### Customer Management
Complete customer list with search, pagination, and quick actions.

### Lead Tracking
Kanban-style lead management with drag-and-drop status updates.

## 🐛 Troubleshooting

### Common Issues

#### PostgreSQL Connection Error
```
Error: password authentication failed for user "postgres"
```
**Solution:** Update `application.properties` with correct database credentials.

#### Port Already in Use
```
Error: Port 8080 is already in use
```
**Solution:** Change port in `application.properties` or kill the process using port 8080.

#### CORS Error
```
Error: CORS policy blocked the request
```
**Solution:** Verify CORS configuration in `SecurityConfig.java` allows your frontend origin.

#### JWT Token Expired
```
Error: 401 Unauthorized
```
**Solution:** Login again to get a fresh token. Tokens expire after 24 hours.

#### Maven Build Failure
```
Error: Compilation failure
```
**Solution:** Ensure Java 17+ is installed and JAVA_HOME is set correctly.

### Getting Help

If you encounter issues:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review application logs in console
3. Verify database connection
4. Ensure all dependencies are installed
5. Check that all services are running

## 🎯 Future Enhancements

- [ ] Email notifications for lead updates
- [ ] Advanced analytics with predictive modeling
- [ ] Mobile applications (iOS & Android)
- [ ] Real-time notifications via WebSocket
- [ ] Export data to CSV/PDF/Excel
- [ ] Team collaboration features
- [ ] Integration with email services
- [ ] Advanced search with filters
- [ ] Customizable dashboards
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow Java and JavaScript coding standards
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- Name: Shanmukha Raghavendra Ravutu
- Email: shanmukharaghavendra.r@gmail.com

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- PostgreSQL for the robust database
- Tailwind CSS for the beautiful styling
- Recharts for data visualization

## 📞 Support

For support, email your.email@example.com or open an issue in the GitHub repository.

---

⭐ **Star this repository if you find it helpful!**

Built with ❤️ using Spring Boot and React
