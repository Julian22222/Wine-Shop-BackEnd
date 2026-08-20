# 🍷 Wine Shop — Backend

REST API backend for the Wine Shop e-commerce application.

This project provides the backend services used by the Wine Shop React frontend, including wine product management and user data management. The API is built with Node.js and Express and uses MongoDB with Mongoose for data persistence.

The backend and frontend are maintained in separate repositories.

## 🚀 Live API

**[Wine Shop Backend API](https://wine-shop-backend.onrender.com/)**

## 🔗 Related Project

**Frontend:** [Wine Shop — React Frontend](https://github.com/Julian22222/Wine-Shop)

The complete application is structured as:

```text
Wine Shop
├── Frontend
│   └── React application
│
└── Backend
    └── Node.js / Express REST API
```

## ✨ Features

### Wine Management

- Retrieve all wine products
- Retrieve a single wine by ID
- Add a new wine
- Update wine information
- Delete a wine
- Store wine ratings and reviews
- Store product availability and pricing information

### User Management

- Retrieve users
- Retrieve a single user by ID
- Create users
- Update user information
- Delete users
- Store user favourites

### API

- RESTful API endpoints
- JSON request and response handling
- HTTP status codes
- Basic API error handling
- CORS support
- Environment-based configuration

## 🛠️ Technologies

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JavaScript**
- **REST API**
- **CORS**
- **dotenv**
- **Nodemon**
- **Git / GitHub**

## 🏗️ Architecture

The backend follows a simple separation of responsibilities between routes, controllers and models.

```text
Client
  │
  │ HTTP / REST API
  ▼
┌──────────────────────┐
│       Express        │
│       Routes         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│     Controllers      │
│                      │
│ Wine / User logic    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       Mongoose       │
│       Models         │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│       MongoDB        │
│                      │
│  Wines / Users       │
└──────────────────────┘
```

### Project Structure

```text
Wine-Shop-BackEnd/
│
├── controllers/
│   ├── user-controller.js
│   └── wine-controller.js
│
├── models/
│   ├── user.js
│   └── wine.js
│
├── routes/
│   └── wine-routes.js
│
├── Data_for_MongoDB_Compass/
│
├── server.js
├── package.json
└── .gitignore
```

## 📡 API Endpoints

### Health Check

| Method | Endpoint | Description                          |
| ------ | -------- | ------------------------------------ |
| GET    | `/`      | Check that the API server is running |

### Wines

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | `/wines`     | Retrieve all wines    |
| GET    | `/wines/:id` | Retrieve a wine by ID |
| POST   | `/wines`     | Create a new wine     |
| PATCH  | `/wines/:id` | Update a wine         |
| DELETE | `/wines/:id` | Delete a wine         |

### Users

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | `/users`     | Retrieve all users    |
| GET    | `/users/:id` | Retrieve a user by ID |
| POST   | `/users`     | Create a new user     |
| PATCH  | `/users/:id` | Update a user         |
| DELETE | `/users/:id` | Delete a user         |

## 🍷 Wine Data Model

Wine documents contain information such as:

- Name
- Wine type
- Winery
- Rating
- Reviews
- Location
- Image
- Year
- Description
- Grade
- Availability
- Price
- Votes

The schema uses Mongoose validation for required fields and defines embedded review data within wine documents.

## 👤 User Data Model

User documents contain:

- Name
- Email
- Password
- Favourite wines

The user model is managed through Mongoose.

## 🔌 Frontend Integration

The API is consumed by the Wine Shop React frontend.

**Frontend repository:**
[Wine Shop — Frontend](https://github.com/Julian22222/Wine-Shop)

The frontend communicates with the backend using HTTP requests to the REST API.

```text
React Frontend
      │
      │ HTTP requests
      ▼
Express REST API
      │
      │ Mongoose
      ▼
MongoDB
```

## 💻 Getting Started

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- MongoDB or access to a MongoDB Atlas database

### Installation

Clone the repository:

```bash
git clone https://github.com/Julian22222/Wine-Shop-BackEnd.git
```

Navigate into the project:

```bash
cd Wine-Shop-BackEnd
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root.

The application expects the following environment variables:

```env
PORT=3000
DB_USERNAME=your_mongodb_username
PASSWORD=your_mongodb_password
DATABASE=your_database_name
```

The MongoDB connection string is constructed from these environment variables in `server.js`.

### Run the Development Server

Start the application with:

```bash
npm run dev
```

The development server uses Nodemon and automatically restarts when source files change.

You should see a message similar to:

```text
Connected to MongoDB
Server is listening on port ...
```

### Test the API

Once the server is running, you can test the health-check endpoint:

```bash
curl http://localhost:3000/
```

Expected response:

```json
{
  "test": "Server is Working"
}
```

API endpoints can also be tested using tools such as Postman.

## 🗄️ Database

The application uses MongoDB as its database and Mongoose as the ODM layer.

MongoDB can be used locally or through MongoDB Atlas.

The repository also contains example database data for working with MongoDB Compass.

## 🧪 Testing

The project uses Jest and Supertest for automated unit and integration testing.

**49 automated tests covering controllers and API endpoints.**

The test suite covers:

- Wine controller operations
- User controller operations
- API endpoints
- Successful requests
- Error handling
- Database-related failure scenarios

Run the tests with:

```bash
npm test
```

## 🚀 Deployment

The backend is deployed as a Node.js application on Render.

**Live API:**
https://wine-shop-backend.onrender.com/

Environment variables are used to keep database connection credentials outside the source code.

## 🎯 Project Goals

This project was developed to demonstrate practical backend development using Node.js, Express and MongoDB.

Key areas of focus include:

- REST API development
- CRUD operations
- MongoDB data modelling
- Mongoose schemas and models
- Separation of routes, controllers and models
- API error handling
- Frontend/backend integration
- Environment-based configuration
- Deployment of a Node.js API

## 🔮 Future Improvements

Potential improvements include:

- Add automated unit and integration tests
- Add request validation
- Improve API error handling and status codes
- Add authentication and authorisation
- Hash user passwords before storing them
- Add API documentation with Swagger/OpenAPI
- Add pagination for larger datasets
- Add input sanitisation and additional security controls
- Add structured logging
- Add CI/CD automation
- Add Docker

## 👨‍💻 Author

**Julian Golovens**

- **GitHub:** [Julian22222](https://github.com/Julian22222)
- **LinkedIn:** [Julian Golovens](https://www.linkedin.com/in/julian-goloven-74a324256)
- **Portfolio:** [Portfolio](https://julian22222.github.io/Portfolio/)

**Wine Shop — Node.js / Express / MongoDB REST API**
