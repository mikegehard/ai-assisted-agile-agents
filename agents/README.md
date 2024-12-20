# Langchain.js TypeScript Agent

This project is a Langchain.js application using TypeScript. It demonstrates how to create a simple AI agent that generates company names based on a given product.

## Project Description

The application uses OpenAI's language model to generate creative company names. It utilizes Langchain.js to create a prompt template and an LLMChain for interacting with the AI model.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Bun (latest version)
- An OpenAI API key

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd agents
   ```

2. Install the dependencies:
   ```
   bun install
   ```

3. Create a `.env` by copying the `.env.example` file:
   ```
   cp .env.example .env
   ```

4. Add your API keys to the `.env` file.

## Running the Project

NOTE: This project uses `bun start` instead of `bun run` to run commands
so that typechecking is run automatically before running the command.

### Starting the Server

To start the server:
```
bun start start:server
```

### Running the Development Server

To run the server in development mode with auto-reloading:
```
bun start dev
```

### Running Acceptance Tests

To run the acceptance tests:
1. Make sure you are in the `agents` directory:
   ```
   cd agents
   ```
2. Run the web acceptance tests:
   ```
   bun start test:acceptance:web
   ```
3. Run the CLI acceptance tests:
   ```
   bun start test:acceptance:cli
   ```
4. Run all acceptance tests:
   ```
   bun start test:acceptance
   ```

The web acceptance tests will automatically start the server before running, so there's no need to start the server separately.

For CLI acceptance tests, ensure that the CLI application is properly set up and that all necessary dependencies are installed.

Note: Ensure you're in the `agents` directory before running any of these commands.

### Running the unit tests

```
bun start test
```

### Running the CLI

To use the command-line interface:

1. Ensure you're in the `agents` directory.
2. Run the CLI with the following syntax:
   ```
   bun start cli
   ```

For more information on available commands and options, use
the `/help` command in the chat window.

## Running code with local models

Note: The performance and capabilities of local models may differ from cloud-based models like OpenAI's GPT. Adjust your expectations accordingly.

To run the code with a local model using Ollama, follow these steps:

1. Install Ollama:
   Visit [Ollama's official website](https://ollama.ai/) and follow the installation instructions for your operating system.

2. Pull the Code Llama model:
   Open a terminal and run:
   ```
   ollama pull codellama
   ```
   This will download the Code Llama model, which is optimized for coding tasks.

3. Testing Ollama

   To ensure Ollama is running correctly in the background, follow these steps:

   1. Open a terminal window.

   2. Run the following command to check if Ollama is responsive:
      ```
      curl http://localhost:11434/api/tags
      ```

   3. If Ollama is running, you should see a JSON response listing available models. It should look something like this:
      ```json
      {"models":[{"name":"codellama","modified_at":"2024-02-20T12:34:56Z","size":3791650816}]}
      ```

   4. If you receive an error or no response, Ollama may not be running. Start it by running:
      ```
      ollama serve
      ```

   5. Once Ollama is running, you can proceed with running your agent using the local model.

   Remember to keep Ollama running in the background while using your agent with the local model.
