# Backend API

This is the backend API for the Panda Management System. It is built using Express and Typescript, and interacts with a MongoDB database.

## Structure

```
backend
│   index.ts
│   package.json
├── api
│   │   pandas.controller.ts
│   │   pandas.route.ts
└── dao
    │   pandasDAO.ts
```

The backend is structured into two main folders: `api` and `dao`. The `api` folder contains the routes and controllers for the API, while the `dao` folder contains the data access objects that interact with the database.

### Dependencies

This project depends on the following libraries:

    cors: ^2.8.5
    dotenv: ^16.0.3
    express: ^4.18.2
    mongodb: ^5.0.1

### Dev Dependencies

    @types/cors: ^2.8.13
    @types/express: ^4.17.17
    @types/mongodb: ^4.0.7
    @types/node: ^18.14.0
    concurrently: ^7.6.0
    nodemon: ^2.0.20
    typescript: ^4.9.5

## Scripts

The following scripts are available:

    build: Runs the TypeScript compiler to build the project.
    start: Starts the built application.
    dev: Runs the TypeScript compiler in watch mode and starts the application with nodemon.
    test: Placeholder script for running tests.

## Starting the application

To start the application, run the following command:

    npm run dev

This will start the application in development mode, which will watch for changes to the source code and restart the application when changes are detected.

## Testing the application

To test the application, run the following command:

    npm run test

This will run the tests for the application.

## Building the application

To build the application, run the following command:

    npm run build

This will build the application into the `dist` folder.

## Starting the application

To start the application, run the following command:

    npm run start

This will start the application in production mode.

## Environment Variables

The following environment variables are used by the application:

    PORT: The port that the application will listen on. Defaults to 5000.
    MONGO_URI: The URI of the MongoDB database to connect to.

## API

The following routes are available:

    GET /pandas: Returns a list of pandas.
    GET /pandas/:id: Returns a single panda.
    POST /pandas: Creates a new panda.
    PUT /pandas/:id: Updates an existing panda.
    DELETE /pandas/:id: Deletes an existing panda.
