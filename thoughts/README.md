# Thoughts

A place for me to outline my current thinking on how AI integrates into my software development process. These thoughts are intended to be living documents that will be updated as my thinking evolves.

They may or may not turn into articles posted to [Substack](https://aiassistedagiledevelopment.substack.com/)
or as playbooks in the [playbooks](../playbooks/README.md) directory.

## Article Workflow

1. Copy the template from [template](example.outline.md) to a new file in the `thoughts` directory.
1. Fill in the template with your thoughts.
1. Use a cutting edge reasoning AI assistant (like o1) with [outline prompt](../prompts/outline-generation.xml) to generate an outline.
1. Copy the outline into the file.
1. Edit the outline.
1. Use a less expensive model (like Anthropic Sonnet or GPT 4o) AI assistant with [article prompt](../prompts/article-generation.xml) to generate the article.
1. Copy the article into a new file. Example: `playbooks.article.md`.
1. Edit the article.
1. Use a less expensive model (like Anthropic Sonnet or GPT 4o) AI assistant with [proofreading prompt](../prompts/proofreading.xml) to proofread the article.
1. Integrate feedback from the proofreading.
1. Post the article to [Substack](https://aiassistedagiledevelopment.substack.com/) by copying the rendered article.