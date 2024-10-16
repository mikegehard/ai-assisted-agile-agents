# Langchain.js TypeScript Agent

This project is a Langchain.js application using TypeScript. It demonstrates how to create a simple AI agent that generates company names based on a given product.

## Project Description

The application uses OpenAI's language model to generate creative company names. It utilizes Langchain.js to create a prompt template and an LLMChain for interacting with the AI model.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (usually comes with Node.js)
- An OpenAI API key

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd agents
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` by copying the `.env.example` file:
   ```
   cp .env.example .env
   ```

4. Add your API keys to the `.env` file.

## Running the Project

To run the project, run:
    ```
    npx tsx src/agent.ts

    ```
