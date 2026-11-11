# FACT UNLOCKED AI API

Cloudflare Worker source lives in this directory.

- Entry point: `worker.js`
- Wrangler config: `wrangler.jsonc`
- Workers AI binding: `AI`
- Deploy command: `npx wrangler deploy`

This file also records the intended deployment layout for the project.

The production Wrangler config is at the repository root and targets `cloudflare/worker.js`.

Prompt behavior updated: the latest owner task takes priority over repeated self-introduction. Broad mystery-topic requests must return three concrete options and a recommended Mini Research Brief.


Build note: Increased chat payload limit to 16,000 characters and added a 12,000-character input guard/counter in Meta AI Production Bridge.
