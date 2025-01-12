# Prompts

## Overview
This directory contains all of the prompts for AI Assisted Agile Software Development.

Prompts are an important piece of the context, model, prompt traid of AI assisted
software development. They provide a way to educate the LLM on how the human wants
it to behave in addition to providing instructions to the LLM.

These prompts can be resued across AI coding tools.

These prompts are constantly evolving and will be updated as necessary.

## List of prompts

### article-generation.xml
A prompt for generating Substack articles from an outline. Focuses on clear structure, succinct tone, and using examples/analogies to explain complex concepts.

### metaprompt.xml
A meta-prompt for generating other prompts. It helps create detailed and effective prompts by analyzing user input and generating comprehensive prompt templates with proper structure and variables.

### outline-generation.xml
A prompt for creating structured outlines for Substack posts. Takes post title, goals, and questions to answer as input to generate a markdown outline.

### pairProgrammingSystem.md
A comprehensive guide for AI pair programming partners. Defines the role, communication protocols, development workflow using TDD/XP principles, code quality standards, and working principles for effective collaboration.

### pairProgrammingSystem.xml
XML-formatted version of the pair programming system prompt, structured with clear sections for better LLM parsing and understanding. Contains the same content as the MD version but with explicit XML tagging.

### proofreading.xml
A prompt for proofreading articles with a focus on technical writing. Identifies typos and suggests improvements while maintaining the original meaning of the text.
