# Safely Executing AI Generated Code on your local machine

## Background

While AI code assistants like GitHub Copilot and Claude can significantly boost developer
productivity, executing AI generated code directly on local machines can pose security
risks. Studies indicate that approximately 40% of AI-generated code contains security
vulnerabilities. These risks range from vulnerable code generation to system compromise and
resource exploitation.

This playbook provides practical guidance on using containerization to safely execute and test AI generated code while protecting your development environment. This becomes more
important as we close the feedback loop by allowing an AI assistant to automatically run
commands, like running a test suite, to iterate on AI generated code.

Risks:
- System compromise through unauthorized system calls
- Resource exploitation (CPU, memory, storage)
- Data privacy violations and credential exposure
- File system manipulation
- Potential remote code execution vulnerabilities

## Recommendations
- Use Development Containers
    - Set up VS Code with the Remote - Containers extension
    - Create standardized devcontainer configurations for your projects
    - Define resource limits in container configurations
    - Implement network isolation policies
    - Mount only necessary source code volumes

- Follow Docker Best Practices
    - Use official base images from trusted sources
    - Implement least privilege principles
    - Keep base images updated
    - Define clear resource limits

- Code Review Process
    - Human in the loop code review for AI generated code
    - Use automated security scanning tools
    - Implement pre-commit hooks for secret detection

- Tools
    - [VS Code Remote - Containers extension](https://code.visualstudio.com/docs/remote/containers)
    - [Devcontainers cli](https://github.com/devcontainers/cli)
    - [Docker Desktop](https://www.docker.com/products/docker-desktop)
    - [PodMan](https://podman.io/)
    - Other containerization tools

## References
- [Sandboxing LLM generated code](https://hackernoon.com/introducing-llm-sandbox-securely-execute-llm-generated-code-with-ease)
- [Example DevContainer Configuration](https://github.com/Aider-AI/aider/pull/2905)
- [VS Code Remote Development](https://code.visualstudio.com/docs/remote/containers)
- [Docker Best Practices](https://docs.docker.com/build/building/best-practices/)
- [DevContainer Specification](https://containers.dev/)
