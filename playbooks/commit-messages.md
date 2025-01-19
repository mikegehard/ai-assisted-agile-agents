# Commit messages

## Background
It is tempting to use AI assistants to generate commit messages to reduce the cognitive load
on the developer making the changes. When this happens, the message typically only contains
the "what" of the change and not the "why". This is a problem because the "why" is often more
interesting to future developers.

The "why" helps records the reasoning behind the code changes, providing context and
making it easier for other developers (including your future self) to understand the
purpose of the commit. Understanding this context may help them make better decisions
when working with the code in the future. It may also help code reviewers understand
the intent of the changes and provide more useful feedback.

In the world of AI assisted software development, the "why" provides more
context to an AI assistant we use to help us understand the codebase and how it has evolved
over time.

## Recommendations
- Allow AI assistants to generate the subject of the commit message based on the diffs
but require the developer to provide the "why" of the change in the body.

- Combine this with the (content writing playbook)[content-writing.md] to both speed up
and improve the quality of your commit messages.

    Use `git config --global core.editor "code --wait"` to open VS Code as the default editor for commit messages.
    This will allow you to use Copilot to help you generate the commit message.

## Example prompts
[Aider prompt](https://github.com/Aider-AI/aider/blob/main/aider/prompts.py#L8)

## References
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
