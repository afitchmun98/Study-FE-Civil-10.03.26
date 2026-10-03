# FE Civil Practice Lab — Compact API operation setup

**App 4.1.5.51.58 · EXP3.0.2.4.3.45**

Automatic API batches generate proposals for review before saving. Setup now uses full-width operation categories instead of two uneven stacks of cards. The earlier .44 app and ZIP remain preserved in the workspace. Existing AI prompt templates are unchanged.

## Using API Batch

1. Open Question Bank → Tools → AI Batch Tools → API Batch.
2. Choose the scope, operations, and seconds between API requests. The default delay is one second; your chosen delay is remembered.
3. Generate proposals. Activity provides Pause/Resume, Skip Current Question, Stop Batch, and an editable request delay. A rate-limit response pauses further requests and enforces the cooldown before resuming.
4. Review the original and proposed content. Accept & Next saves and advances. Previous/Next and the question selector let you revisit decisions. Reject can restore accepted fields while protecting later edits. Accept All and Reject All are also available.
5. Finish & Retry lists questions needing attention, with selected checkboxes, Select all, and Clear all. Retry only your chosen questions, or Finish Review & End Task.

Closing the dialog preserves drafts and allows an active run to continue. Reloading the app recovers the task without restarting API requests. Use Resume API Review to return to review, or Resume Unfinished Work to continue generation. Save & Exit stops generation and saves the task for later. Usage, spend, or credit exhaustion suspends the run immediately; update API access in Settings before resuming. Completed operation checkpoints avoid rerunning earlier work. Finish retains accepted changes and clears only this task’s tracking; discarding unfinished proposals requires confirmation.

## Starting over

**Start Over** appears beside Close whenever an API task exists. It works during generation, Pause, Retry, saved recovery, review, and usage suspension. Confirming stops the worker and clears that task’s unaccepted proposals, checkpoints, and review history. Accepted Question Bank changes stay saved; clearing the task also removes its undo history. Cancel keeps the current task. No new API requests start until you choose operations and click Generate Proposals again.

The API workspace now uses tighter spacing, a narrower overview, side-by-side request pacing on wide screens, and a combined question navigator. Longer saving/resume explanations are expandable. Controls retain readable labels and wrap on smaller screens.

## Operation setup

Metadata, Solutions, Question content, and Diagrams and AI data share one aligned list. The original 12 operation controls and their settings remain available. Metadata groups and solution generation settings appear below the relevant options. Solution Diagram context appears when Generate solution diagrams is selected; hiding it preserves its chosen value. Instructions expand under “How this batch works,” freeing the former sidebar for the operation controls. Narrow windows stack the choices.

## GitHub / Google AI Studio

Extract the ZIP and upload its **contents** to your repository root. Use `AI_STUDIO_IMPORT_PROMPT.md` after importing the repository into AI Studio. See [import instructions](AI_STUDIO.md) and [GitHub upload notes](GITHUB_UPLOAD.md).

```bash
npm test
npm run build
npm run dev
```

Node.js 20+ is required. The preview server honors `PORT`; `index.html` also works as a standalone app. Building creates `dist/index.html`. Runtime and build commands require no npm dependencies. Browser QA requires Playwright and Chrome as documented in the test scripts.

## Verification

Read the [simple QA report](docs/API_SETUP_LAYOUT_REPORT.md). The release gate includes the new API tests and the existing manual batch, Question Bank, filters, sidebar, study, and visual regression suites. API QA uses mocked provider responses with the actual generators and validators; no paid API requests are made. Real provider quotas and live response quality still require a user-run check.

Historical reports retain their original release identities. Provider routes, app database schema, Firebase configuration, manual batch behavior, and individual API actions are preserved. API proposals use a separate local IndexedDB review store; they are not added to the saved Question Bank until accepted. Review tracking contains no provider keys and is local to the current browser/origin.
