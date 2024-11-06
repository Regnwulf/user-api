
# User API Project

This is a User API backend project developed with Node.js, TypeScript, Express, and TypeORM, designed to manage user data, including creating, updating, retrieving, and searching users. It also incorporates Jest for testing and follows best practices in coding with ESLint and Prettier for linting and code formatting.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Routes](#available-routes)
- [Testing](#testing)
- [Linting and Code Formatting](#linting-and-code-formatting)
- [Technologies Used](#technologies-used)

## Installation

1. Clone this repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

## Environment Variables

Define the following environment variables in a `.env` file in the root of your project:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

## PostgreSQL Database
```
CREATE DATABASE your_db_name;
```

## Running the Application

To start the application, run:

```bash
npm run start
```

This command will start the server at `http://localhost:3000` by default. You can adjust the port by setting the `PORT` environment variable.

## Project Structure

```
auth_project/
├── src/
│   ├── config/
│   │   └── database.ts              # Database configuration
│   ├── controllers/
│   │   └── user.controller.ts       # User controller
│   ├── entities/
│   │   └── user.entity.ts           # User entity
│   ├── repositories/
│   │   └── user.repository.ts       # User repository
│   ├── routes/
│   │   └── user.routes.ts           # User routes
│   ├── services/
│   │   └── user.service.ts          # User service
│   └── index.ts                     # Application entry point
└── test/
    ├── controllers/
    │   └── user.controller.test.ts  # User controller test
    │── services/
    │   └── user.service.test.ts     # User service test
    │services/
    │   └── user.service.test.ts     # User service test
```

## Available Routes

### POST `/api/users`
- **Description**: Creates a new user.
- **Body**:
    ```json
    {
      "nome": "John Doe",
      "email": "john@example.com",
      "senha": "password"
    }
    ```

### PUT `/api/users/:id`
- **Description**: Updates user information by ID.

### GET `/api/users`
- **Description**: Retrieves all users.

### GET `/api/users/search?term=<term>`
- **Description**: Searches for users by name or email containing the given term.

## Testing

Run the test suite with:

```bash
npm run test
```

This will execute unit tests for services, controllers, and route handling, using mocks for isolated testing.

## Linting and Code Formatting

This project uses ESLint and Prettier for linting and formatting. Run the following commands to check for linting errors and format the code:

```bash
npm run lint
npm run format
```

## Technologies Used

- **Node.js & TypeScript** - Backend development
- **Express** - Web framework
- **TypeORM** - ORM for database interactions
- **PostgreSQL** - SQL Database
- **Jest** - Testing framework
- **ESLint & Prettier** - Code quality and formatting
