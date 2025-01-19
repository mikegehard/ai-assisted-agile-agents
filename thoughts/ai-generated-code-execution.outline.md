# Executing AI generated code playbook

## Goals
- To explain to the reader the risks of executing AI generated code locally.
- To educate the reader using Docker containers and devcontainers to improve security.

## Questions to answer
- Why is running AI generated code locally risky?
- How can you use Docker and devcontainers to improve security?

## Additional information

Claude generated summary of possible security problems with using LLM generated code:

Comprehensive LLM Security Risks in Local Development
Code Generation Risks
1. Vulnerable Code Generation
Approximately 40% of AI-generated code contains security vulnerabilities
Common issues include input validation flaws and insecure configurations
Reference: GitLab Developer Survey, cited in Security Journey 1
2. Supply Chain Vulnerabilities
Outdated or compromised dependencies may be suggested
Malicious third-party code snippets could be recommended
Reference: OWASP Top 10 for LLM Applications 2
3. Prompt-Based Attacks
Malicious prompts can expose sensitive information
System prompt leakage can reveal security practices
Prompt injection through code comments and documentation
Reference: Vulcan Cyber Research Study 3
Local Machine Execution Risks
4. System Compromise
Unauthorized system calls and privilege escalation attempts
File system manipulation risks
Potential for remote code execution (RCE)
Reference: CyberArk Research - "Anatomy of an LLM RCE" 4
5. Resource Exploitation
CPU resource exhaustion through infinite loops
Memory leaks and storage space consumption
Network resource abuse
Reference: Moveworks Security Analysis 5
6. Data Privacy Violations
Unauthorized access to local files and credentials
Environment variable exposure
Cached credential compromise
Reference: Exabeam Security Report 6
Authentication and Secrets Management
7. API Key Security
Risk of embedding API keys in generated code
LLM caching of sensitive tokens
Token rotation and management challenges
Reference: Google Cloud Security Best Practices 7
8. Secret Scanning and Protection
Automated detection of secrets in generated code
Pre-commit hook implementation
Secure secret storage practices
Reference: GitGuardian Security Report 8
Version Control and Deployment Security
9. Git Security
Prevention of sensitive data commits
Repository permission management
Git history analysis and cleanup
Reference: GitHub Security Lab Guidelines 9
10. CI/CD Pipeline Security
Automated security gates implementation
Container image scanning requirements
Build process security controls
Reference: Snyk Container Security Report 10
Regulatory and Compliance
11. Compliance Requirements
HIPAA, GDPR, and industry-specific regulations
Audit trail requirements for AI-generated code
Documentation standards for regulated industries
Reference: Deloitte AI Governance Framework 11
Testing and Validation
12. Enhanced Security Testing
Fuzzing requirements for generated code
Security-focused unit test coverage
Penetration testing considerations
Runtime behavior monitoring
Reference: Microsoft Security Development Lifecycle 12
Model-Specific Risks
13. Hallucination-Related Security Issues
Generation of plausible but insecure code patterns
False security assurances in code comments
Incorrect implementation of security-critical components
Reference: Barracuda Networks Research 13
14. Training Data Security
Risk of contaminated training data in local fine-tuning
Biased data affecting security decisions
Potential backdoors in model suggestions
Reference: OWASP LLM Risk Framework 14
15. Model Protection
Security of local model weights and configurations
Protection of fine-tuned models and custom prompts
Intellectual property exposure risks
Reference: Cobalt.io Security Analysis 15
Integration and Third-Party Security
16. API Integration Security
Endpoint security requirements
Webhook handling security
Service-to-service authentication
Data validation at integration points
Reference: NIST API Security Guidelines 16
17. Rate Limiting and Resource Protection
API abuse prevention
DOS protection mechanisms
Cost management security
Reference: CloudFlare API Security Report 17
Incident Response and Recovery
18. Security Incident Management
LLM-specific incident response procedures
Code rollback and recovery processes
Forensics and investigation protocols
Notification requirements and procedures
Reference: SANS Institute Incident Response Framework 18
Error Handling Security
19. Secure Error Management
Prevention of information disclosure in errors
Exception handling security patterns
Debug information protection
Reference: OWASP Error Handling Cheat Sheet 19
Mitigation Strategies
20. Isolation and Sandboxing
Use containerization (Docker) for code testing
Implement resource limits
Network isolation
Reference: HackerNoon - LLM Sandbox Implementation 20
21. Code Review Requirements
Mandatory line-by-line review of generated code
Focus on system calls and permissions
Security scanning automation
Reference: Pieces.app Security Best Practices 21
22. Environment Protection
Limited permission user accounts
Regular backups
Version control tracking
Reference: Nexla Security Guidelines 22
23. Model Security Measures
Regular validation of model outputs
Implementation of security boundaries
Monitoring of model behavior
Reference: Granica AI Security Guidelines 23
References
Note: While these references were found through research, they should be independently verified as knowledge cutoff dates might affect their current validity.

Footnotes
https://www.securityjourney.com/ai/llm-tools-secure-coding ↩

https://owasp.org/www-project-top-10-for-large-language-model-applications/ ↩

https://vulcan.io/blog/exploiting-cyber-security-vulnerabilities-via-llm-agents/ ↩

https://www.cyberark.com/resources/threat-research-blog/anatomy-of-an-llm-rce ↩

https://www.moveworks.com/us/en/resources/blog/secure-code-execution-for-llms ↩

https://www.exabeam.com/explainers/ai-cyber-security/llm-security-top-10-risks-and-7-security-best-practices/ ↩

https://cloud.google.com/security/api-key-best-practices ↩

https://www.gitguardian.com/resources/state-of-secrets-sprawl-2024 ↩

https://github.blog/2024-01-security-best-practices-for-ai-development/ ↩

https://snyk.io/learn/container-security/ ↩

https://www2.deloitte.com/ai-governance-framework ↩

https://www.microsoft.com/en-us/securityengineering/sdl/ ↩

https://blog.barracuda.com/2024/04/03/generative-ai-data-poisoning-manipulation ↩

https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/ ↩

https://www.cobalt.io/blog/llm-theft-prevention-strategies ↩

https://csrc.nist.gov/publications/detail/sp/800-95/final ↩

https://www.cloudflare.com/resources/api-security-risks-2024 ↩

https://www.sans.org/white-papers/incident-response-frameworks/ ↩

https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html ↩

https://hackernoon.com/introducing-llm-sandbox-securely-execute-llm-generated-code-with-ease ↩

https://code.pieces.app/blog/code-security-best-practices-protecting-projects-when-using-ai ↩

https://nexla.com/ai-infrastructure/llm-security/ ↩

https://granica.ai/blog/llm-security-risks-grc ↩

## Outline

<playbookOutline>
    <title>Safely Executing AI Generated Code on your local machine</title>

    <background>
        While AI code assistants like GitHub Copilot and Claude can significantly boost developer
        productivity, executing AI generated code directly on local machines can pose security
        risks. Studies indicate that approximately 40% of AI-generated code contains security
        vulnerabilities. These risks range from vulnerable code generation to system compromise and
        resource exploitation.

        This playbook provides practical guidance on using containerization to safely execute and test AI generated code while protecting your development environment.

        Risks:
        - System compromise through unauthorized system calls
        - Resource exploitation (CPU, memory, storage)
        - Data privacy violations and credential exposure
        - File system manipulation
        - Potential remote code execution vulnerabilities

    </background>

    <recommendations>
        <section>Use Development Containers</section>
        <items>
            - Set up VS Code with the Remote - Containers extension
            - Create standardized devcontainer configurations for your projects
            - Define resource limits in container configurations
            - Implement network isolation policies
            - Mount only necessary source code volumes
        </items>

        <section>Follow Docker Best Practices</section>
        <items>
            - Use official base images from trusted sources
            - Implement least privilege principles
            - Keep base images updated
            - Define clear resource limits
        </items>

        <section>\</section>
        <items>
            - Human in the loop code review for AI generated code
            - Use automated security scanning tools
            - Implement pre-commit hooks for secret detection
        </items>

    </recommendations>

    <tooling>
        <section>Recommended Tools</section>
        <items>
            - VS Code Remote - Containers extension
            - Docker Desktop
        </items>
    </tooling>

    <references>
        <reference>
            [VS Code Remote Development](https://code.visualstudio.com/docs/remote/containers)
        </reference>
        <reference>
            [Docker Best Practices](https://docs.docker.com/build/building/best-practices/)
        </reference>
        <reference>
            [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
        </reference>
        <reference>
            [DevContainer Specification](https://containers.dev/)
        </reference>
    </references>

</playbookOutline>
