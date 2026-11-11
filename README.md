# DROPIA Instagram Agent

Production Instagram DM agent for [@drop_ia](https://www.instagram.com/drop_ia/), running on Cloudflare Workers with Claude (Anthropic API) and the Meta Graph API. Live since October 2026.

## What it does

1. **Comment to DM.** Someone comments a keyword on a reel (e.g. `AGENTE`, `WEB`, `MOTOR`). The Instagram webhook hits the Worker, which sends a private-reply DM with the promised content plus quick-reply buttons, and replies publicly to the comment.
2. **AI conversation.** When the person answers in DM (button or free text), Claude continues the conversation using the system prompt in `src/prompt.ts`, with the lead's context appended.
3. **Lead tracking.** Cloudflare KV stores where each lead came from (`origin:`) and the pain point they picked (`lead:`).
4. **Human handoff.** If a team member writes manually in a thread, the bot stays silent with that person for 24h.
5. **Scheduled publishing.** A cron trigger (every 10 min) processes a queue of scheduled reels. Admin endpoints are protected by a header key.

## Architecture

```
Instagram comment / DM
        |
        v
Meta webhook (comments, messages) --> Cloudflare Worker (src/index.ts)
                                         |-- verify X-Hub-Signature-256 (HMAC, app secret)
                                         |-- keyword flows (src/flows.ts) --> Graph API: private reply + buttons + public reply
                                         |-- DM reply --> Claude API (src/prompt.ts) --> Graph API: send message
                                         '-- Cloudflare KV: origin, lead, handoff state, publish queue
```

## Stack

- TypeScript, Cloudflare Workers, Wrangler
- Meta Graph API (Instagram webhooks, private replies, quick replies)
- Anthropic SDK (`@anthropic-ai/sdk`), model set by `CLAUDE_MODEL`
- Cloudflare KV, cron triggers

## Security

- Webhook verification token and HMAC signature check on every POST.
- All credentials (`META_APP_SECRET`, `IG_ACCESS_TOKEN`, `ANTHROPIC_API_KEY`, `VERIFY_TOKEN`, `ADMIN_KEY`) are Wrangler secrets, never in the repo.
- The system prompt forbids inventing prices, deadlines, clients or results; those go to a human.

## Run it

```bash
npm install
npx wrangler kv namespace create STATE      # put the id in wrangler.toml
npx wrangler secret put VERIFY_TOKEN        # repeat for META_APP_SECRET, IG_ACCESS_TOKEN, ANTHROPIC_API_KEY, ADMIN_KEY
npm run deploy
```

Then in Meta Developers (App > Instagram > Webhooks) set the Worker URL and `VERIFY_TOKEN`, and subscribe to `comments` and `messages`.

## Tests

```bash
npm test         # keyword matching, 20-char button limit, Meta signature validation
npx wrangler tail  # live logs
```

Bot copy and prompts are in Spanish because the audience is Spanish-speaking.

Built with Claude Code.
