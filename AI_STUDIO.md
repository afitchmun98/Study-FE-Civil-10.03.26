# Google AI Studio Import Guide

## Import

1. Upload this folder's contents to the root of your GitHub repository, or create a repository from this folder and push the `main` branch. See `GITHUB_UPLOAD.md`; do not upload the ZIP itself or nest the named wrapper folder inside the repository.
2. Open Google AI Studio and enter Build mode for a web app.
3. In the prompt input, choose **Add files (+) → Import from GitHub**.
4. Select the repository and let AI Studio install and preview it.
5. If AI Studio asks how to run the app, use `npm run dev`. The server binds to `0.0.0.0` and honors the injected `PORT` environment variable.
6. Run `npm test` after any AI Studio edit. The test fails if the reviewed `index.html` bytes, build identity, database version, scoped Gemini delivery rule, or JavaScript syntax changes.

## Preservation boundary

The current app is a deliberate standalone HTML application. Importing it does not authorize conversion to React, splitting `index.html`, migrating persistence, moving browser-held provider configuration to new code, or changing prompts and parsers. Use the supplied import prompt to tell AI Studio to preview the exact artifact first. The separate Google Drive question-bank prompt authorizes only that narrowly scoped follow-up integration.

Google AI Studio can inject `GEMINI_API_KEY` into server-side projects, but this wrapper does not add a new server-side Gemini path because provider routing is frozen in this build. No secret is required merely to preview the app or exercise its Manual Copy/Paste workflow.

This build adds staged automatic API review and scoped request pacing. Preserve `app/api-batch-review.js` and `ui/api-batch-review.css`, and use `npm run sync:batch-workspace` after authorized edits to embed them into the standalone file. Keep the existing app database schema intact; API review tracking uses its own local database. The new runner does not save proposals until accepted. Hosted transports return rate-limit failures to the batch controller instead of silently retrying; Local AI retains protocol fallback.

Hosted validation remains a separate gate. Import readiness does not substitute for the real-provider and persistence checks listed in `docs/HOSTED_VALIDATION.md`.
