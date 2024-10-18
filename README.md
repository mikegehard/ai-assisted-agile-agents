# AI Assisted Agile Software Development Agents

The goal of this project is to build a group of AI agents that can assist with Agile Software Development.

## Background

I've been working to figure out how to best integrate AI tools into my development workflow.
I've been experimenting with the following tools:

* Aider
* Cursor or IntelliJ with Github Copilot
* Warp terminal
* Claude Projects

The setup that I've come to like is:

* Aider running in a Warp terminal
* Cursor, or IntelliJ with Copilot, as an editor
    * I've been using IntelliJ for Kotlin development because it's familiar
    * I've been using Cursor for Typescript development so I can experience Cursor

Here is my flow. Work in progress:

* I use Aider for assistance with anything that requires me to make changes to more than one file.
    * Implementing new features
    * Moving files
    * I haven't testes too many refactorings yet because the codebase I'm working on isn't large enough yet
    * This is still an area of active research for me.
* I use the editor, with AI assistant, for assistance within a single file.
    * Being able to ask inline for code changes is very helpful.
* I work in small steps, driven by tests when appropriate, and always start with a clean git branch.
    * This allows me to easily throw away any work that the AI assistant gets wrong
    because the cost of generating that code was pretty low.
    * I'm also not afraid to experiment with multiple attempts at a single task,
    and throw away the code if it doesn't work out, because I still learn something from the attempt.
* I run any command that could fail in a terminal in Cursor.
    * This allows me to easily use Cursor's built in AI assistant to help me debug the command if it fails.
* Once the tests are green, or any manual checks are compelete, I make a commit with a descriptive
    commit message that says why I made the commit and/or what I learned during that commit.
    * This description is important because I have a hypothesis that I would write an agent
    that could mine commit messages to answer questions about the evolution of the codebase.

## Repository Structure

* exampleApps - directory of apps that are used to test the AI agents
* agents - home of the CLI and web API that are used to interact with the AI agents

## Technologies

* Typescript
* Langchain
* Langgraph
* Playwright

## Agents

### Acceptance test writer

The goal of this agent is to take a user story and write a Playwright test for it.

#### Input
* User story text in markdown format
    * Could we use Gherkin syntax here?
* Existing Playwright tests for feature

#### Output
* New or revised Playwright test

### Acceptance test runner

The goal of this agent is to take an acceptance test and run it.

#### Input
* Acceptance test
* Running web app URL

#### Output
* Test results
    * Pass/Fail
    * List of errors

### Software developer

The goal of this agent is to write software that:

* compiles, null step for languages that don't use a compiler
* passes all unit tests
* possibly passes all acceptance tests


#### Input
* All acceptance tests
* Existing codebase, including unit tests
* List of errors from acceptance test runner

#### Output
* Code to pass the test

#### Edge cases
* Does this agent bootstrap the codebase or is there another agent that does that?
    * For now, assume that the codebase is bootstrapped and this agent will modify the codebase
        * Most of the time for a developer will be spent in an established codebase
        so this is a lower priority.


### Application deployer

The goal of this agent is to deploy the application.

#### Input
* Deployable artifact from CI process

#### Output
* URL of running application
or
* Errors that are preventing deployment

## LLM Prompt structure

* System vs Human prompts
* Loading context into system prompt
* Loading context from previous messages into later prompts or use an LLM to create new prompt?
* Ramp up on prompt engineering here to figure out the best approach

## Random thoughts

* Creating a "steel thread" from "Hello World" application to staging environment allows for faster iteration later because:
    * You can focus on deployment without other complexities
    * You can run the acceptance tests in staging, which should be as close to production as possible, to
        ensure that nothing is broken
        * This also allows for any change to staging to be deployed to production when required

## Learning resources

### Agent Frameworks

* https://learn.deeplearning.ai/courses/build-llm-apps-with-langchain-js/lesson/1/introduction
* https://learn.deeplearning.ai/courses/ai-agentic-design-patterns-with-autogen/lesson/1/introduction
* https://learn.deeplearning.ai/courses/ai-agents-in-langgraph/lesson/1/introduction
* https://github.com/disler/poc-realtime-ai-assistant

### Testing

* https://learn.deeplearning.ai/courses/automated-testing-llmops/lesson/1/introduction
