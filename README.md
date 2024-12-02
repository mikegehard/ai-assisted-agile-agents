# AI Assisted Agile Software Development Agents

The goal of this project is to build a group of AI agents that can assist with Agile Software Development.

## Background

I've been working to figure out how to best integrate AI tools into my development workflow.
I've been experimenting with the following tools:

* Aider - deprecated in favor of Claude Desktop with MCP
* Cursor or IntelliJ with Github Copilot or Windsurf
* Warp terminal
* Claude Desktop with MCP and Claude Projects

### Current workflow:

* Set up Claude desktop to use MCP.
	* [Config file](https://github.com/mikegehard/ai-assisted-agile-agents/tree/main/tool-configurations)
* Start a Claude project for each codebase.
	* Set project instructions [AI-Assisted Pair Programming Partner prompt](https://github.com/mikegehard/ai-assisted-agile-agents/blob/main/prompts/pairProgrammingSystem.md) 
	* Add in any documentation that you have
		* Screenshots are a great way to get the model UI context.
* Long chats can cause issues for the model because the context window fills up
	* If the model starts struggling, start a new chat.
* Chat with the model as you would with a pair programming partner
	* Be as explicit as possible
	* Move in small steps.
	* This helps the model focus on the task at hand.
	* Also helps prevent long chats. See above.
* Act as if you were mentoring a jr developer?
    * Editor: 
        * Cursor of Windsurf for non Kotlin projects
        * IntelliJ for Kotlin
            * Still need to experiment more with this.
            * Been writing a log of Python and Typescript lately.
    * Use AI in editor for:
        * Autocomplete when changing code.
        * Mass formatting.
	* Review code changes from the model in the editor
		* Git highlighting quickly shows the human what has changed.
		* Allows human to quickly tweak what the model wrote.
	* Make changes in editor
		* Use AI in editor for:
			* Autocomplete when changing code.
			* Mass formatting.
				* Select text and ask inline AI to reformat.
	* Use Warp for running commands.
		* Eventually you will get the [model to run commands](https://github.com/modelcontextprotocol/servers/issues/174)

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
* [ibm agents](https://research.ibm.com/blog/ibm-swe-agents)
* [Evaluating Large Language Models Trained on Code](https://arxiv.org/pdf/2107.03374)
  * Covers some interesting thoughts on sandboxing code written by AI due to security concerns
* [AlphaCodium](https://github.com/Codium-ai/AlphaCodium)
  * Interesting thoughts on how to minimize prompt sensitivity by breaking down the problem into smaller steps that mimic
     the way a human would solve the problem.
  * [Video](https://www.youtube.com/watch?v=23v9GBJvcrc&list=PLISstAySqk7JLal9v_nL09pLAmQLkXzQ4&index=5&pp=iAQB)

### Agent Frameworks

* https://learn.deeplearning.ai/courses/build-llm-apps-with-langchain-js/lesson/1/introduction
* https://learn.deeplearning.ai/courses/ai-agentic-design-patterns-with-autogen/lesson/1/introduction
* https://learn.deeplearning.ai/courses/ai-agents-in-langgraph/lesson/1/introduction
* https://github.com/disler/poc-realtime-ai-assistant

### Testing

* https://learn.deeplearning.ai/courses/automated-testing-llmops/lesson/1/introduction
