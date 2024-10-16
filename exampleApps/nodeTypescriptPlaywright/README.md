# Node.js TypeScript Playwright Example

This project demonstrates a simple Hello World application using Express.js with TypeScript and includes Playwright for acceptance testing.

## Project Structure

- `webApp/`: Contains the Express.js application
- `acceptanceTests/`: Contains Playwright tests
- `dist/`: Contains compiled JavaScript (created after building)

## Setup

1. Make sure you have Node.js installed on your system.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install all the dependencies.

## Running the Application

- To start the development server with hot reloading, run `npm run dev`.
- To build the TypeScript files, run `npm run build`. This will create a `dist` folder with the compiled JavaScript.
- To start the production server after building, run `npm start`.

The server will be running at `http://localhost:3000`.

## Testing

To run the Playwright tests:

1. Make sure you have built the application (`npm run build`).
2. Run `npm test` to execute the Playwright tests.

The tests will start the server, run the tests, and then shut down the server automatically.
