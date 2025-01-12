## Background

I've been working to figure out how to best integrate AI tools into my development workflow.
I've been experimenting with the following tools:

### Tools

#### IDEs/Code Editors/AI assistants
* Aider - deprecated in favor of Claude Desktop with MCP
    - I just found that Claude Desktop fit my flow better.
* Cursor - deprecated in favor of Windsurf
    - May go back to this
    - For now, Windsurf Cascade just seems a bit better.
* IntelliJ/MS Code with Github Copilot - deprecated in favor of Windsurf
    - This will probably be my goto for Kotlin development.
* Windsurf
    - For Python and Typscript development, this is currently my goto.
    - Heavily using it now that you can set Global AI rules.
        - I use this for the AI assisted agile development prompt.
    - Need to prove out how it handles integrating recent information
    with web searches like Claude Desktop + MCP does.
* Warp terminal
    - For running commands, this is currently my goto.
    - Has become a little less useful because Windsurf allows me
        to run commands and then quickly give the output to the AI agent.
* Claude Desktop with MCP and Claude Projects

#### Front end app generators

I'm currently investigaing which one of these I like the most.
As a long time back end developer, my front end skills are a bit rusty.
I'm hoping that these tools can help me quickly prototype front end apps.
I'm also hoping that by using these tools I can learn more about current front end development trends.

* [httlovable.dev](https://lovable.dev/)
* [bolt.new](https://bolt.new/)

#### AI research tools

* [Notebookllm](https://notebooklm.google.com/)
    * Using this to synthesize information from multiple sources.
    * May switch over to Deep Resarch when it becomes available.
* [Perplexity AI](https://www.perplexity.ai/)
    * Solely using this for web search today.
* Claude Desktop with MCP
    * Now that this can use Brave serearch and fetch via MCP, it is
    also good when looking for information about up to date software
    information.


### Workflows:

#### [Principled AI coding](https://agenticengineer.com/principled-ai-coding) - current workflow

After going through the class above, I really feel like this is the way of the future.
More to come...

#### Windsurf - Deprecated in favor of Principled AI coding

I used Windsurf for a while with the [pairProgrammingSystem prompt](https://github.com/mikegehard/ai-assisted-agile-agents/blob/main/prompts/pairProgrammingSystem.md).

This worked well using [chat oriented programming (CHOP)](https://sourcegraph.com/blog/chat-oriented-programming-in-action).

#### Claude Desktop with MCP - Deprecated in favor of Windsurf
* Set up Claude desktop to use [MCP](https://www.anthropic.com/news/model-context-protocol).
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
