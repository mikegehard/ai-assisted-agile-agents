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

Based on my use of Aider, I've decided that the best way to interact with the AI agents is to use a multi-shot conversation within a CLI chat tool.

### Background/research

* Use LangGraph with a set of tools that so that the LLMcan reason about the next step to take.

### Evolving list of agents

#### Acceptance test writer

The goal of this agent is to take a user story and write a Playwright test for it.

#### Input
* User story text in markdown format
    * Could we use Gherkin syntax here?
* Existing Playwright tests for feature

#### Output
* New or revised Playwright test


#### Code writer

The goal of this agent is to write software that:

* compiles, null step for languages that don't use a compiler
* passes all unit tests
* passes all acceptance tests

#### Flow for outside in development
    Pre-conditions:
    * All tests are green
    * Git branch is clean

    1. Human: write acceptance test based on user story
        * May use editor assistant to help write the test
    2. Human: Ask assistant to get the codebase back to green
    3. AI assistant: Determine what tools need to be run to get the codebase back to green based on the changed requirements.
        * Tools:
            * Compile code, null for languages that don't use a compiler
            * Run acceptance tests
            * Run unit tests
        * Thoughts:
            * The smaller the steps/context, the better the LLM's ability to reason about the next step so this is why you compile first.
            * This is why we try to compile first and then run tests.
            * Use a system prompt to educate the LLM about the Outside In TDD process.
    4. Human: Create commit message, including information about why the change was made.
        * A commit is made here so that it is easy to roll back to a green
        state and ask for more refactoring from the AI assistant.
    5. AI assistant: Refactor the code to improve the design of the codebase while keeping the codebase green
    6. Human: Review changes and ammend the last commit to integrate refactoring changes.

#### Edge cases
* Does this agent bootstrap the codebase or is there another agent that does that?
    * For now, assume that the codebase is bootstrapped and this agent will modify the codebase
        * Most of the time for a developer will be spent in an established codebase
        so this is a lower priority.

#### Code refactoring agent

Can you come up with a set of prompts that can be used to guide the llm
thought a set of refactorings?

Could you use the list from the Martin Fowler book "Refactoring" as a starting point?

#### Application deployer

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
* Using summaries created by an LLM can help with context size to keep
costs down and responses faster.

## Random thoughts

* Creating a "steel thread" from "Hello World" application to staging environment allows for faster iteration later because:
    * You can focus on deployment without other complexities
    * You can run the acceptance tests in staging, which should be as close to production as possible, to
        ensure that nothing is broken
        * This also allows for any change to staging to be deployed to production when required

## Resources

### AI and agile software development
* https://thenewstack.io/whats-wrong-with-generative-ai-driven-development-right-now/
* [Program Code Generation with Generative AIs](https://www.mdpi.com/1999-4893/17/2/62])
* https://services.google.com/fh/files/misc/2024_final_dora_report.pdf
* [ai written playwright tests](https://www.ranger.net/)
* [ai to write test cases](https://testrigor.com/)
g [ibm agents](https://research.ibm.com/blog/ibm-swe-agents)

### Agent Frameworks

* https://learn.deeplearning.ai/courses/build-llm-apps-with-langchain-js/lesson/1/introduction
* https://learn.deeplearning.ai/courses/ai-agentic-design-patterns-with-autogen/lesson/1/introduction
* https://learn.deeplearning.ai/courses/ai-agents-in-langgraph/lesson/1/introduction
* https://github.com/disler/poc-realtime-ai-assistant

### Testing

* https://learn.deeplearning.ai/courses/automated-testing-llmops/lesson/1/introduction
