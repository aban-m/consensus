
# Consensus
## Overview
This is a CLI tool that does a simple task: Rewrite the question in different ways, then answer each phrasing. A smaller, faster model does the former, and a bigger model does the latter.  
The hypothesis is that reliability can be estimated from the presence (or lack) of a **consensus**.  
This project is built with ![Vercel's AI SDK](https://ai-sdk.dev).
## Usage
This is a `bun` project. Clone it and run `bun install`. Usage is simple: `bun run start "what is 2 + 2?"`.  
The project is configured to use OpenRouter by default. This can be easily changed from `src/config.ts` after installing the necessary adapters (e.g., `bun add @ai-sdk/openai`). To continue with OpenRouter, set the necessary environment variable `OPENROUTER_API_KEY`.
