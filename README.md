# AI Assisted Agile Software Development Agents

The goal of this project is to build a group of AI agents that can assist with Agile Software Development.

## Repository Structure

* exampleApps - directory of apps that are used to test the AI agents

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

## Random thoughts

* Creating a "steel thread" from "Hello World" application to staging environment allows for faster iteration later because:
    * You can focus on deployment without other complexities
    * You can run the acceptance tests in staging, which should be as close to production as possible, to
        ensure that nothing is broken
        * This also allows for any change to staging to be deployed to production when required
