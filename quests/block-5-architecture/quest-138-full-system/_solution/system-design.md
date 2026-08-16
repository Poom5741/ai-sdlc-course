# System Design — reference (do NOT copy; write your own)

> Reference shape for `system-design.md`. The example system is an
> **automated PR reviewer**. Do not ship this to learners; it lives in
> `_solution/` so maintainers can GREEN-verify the validator.

## Overview

The system reviews a GitHub pull request automatically: when a PR is opened
or updated, the system fetches the diff, analyzes it, asks an LLM reviewer
for issues, and posts a structured comment back on the PR. The design below
specifies the interfaces before any implementation — each component's
contract is fixed first, so the components can be built and tested
independently.

## Component diagram

```
PR webhook              fetch diff
GitHub --> WebhookHandler --> DiffFetcher
                              |
                              | diff
                              v
                          PRAnalyzer
                              |
                              | analysis
                              v
                          LLMReviewer --> comment
                              |
        post comment          |
CommentPoster <----------------+
```

## Named components

1. **WebhookHandler** — receives the GitHub PR webhook, authenticates it.
2. **DiffFetcher** — calls the GitHub API to fetch the PR diff + metadata.
3. **PRAnalyzer** — pre-processes the diff (language detection, file grouping).
4. **LLMReviewer** — sends the analysis to the LLM and parses the review.
5. **CommentPoster** — formats and posts the review comment back to the PR.

## Interface contracts

We specify interfaces BEFORE implementation. Each contract below is the
API the component exposes to the rest of the system. Types are TypeScript-style
shapes; once the contracts are agreed, each component can be implemented and
unit-tested in isolation.

```ts
// Contract: WebhookHandler
interface WebhookEvent { repo: string; prNumber: number; action: string; }
interface WebhookHandler {
  // Validates the GitHub signature, parses the payload, returns a normalized event.
  handle(headers: Headers, body: Buffer): Promise<WebhookEvent>;
}

// Contract: DiffFetcher
interface PRDiff { files: DiffFile[]; baseSha: string; headSha: string; }
interface DiffFile { path: string; additions: string[]; deletions: string[]; }
interface DiffFetcher {
  fetch(repo: string, prNumber: number): Promise<PRDiff>;
}

// Contract: PRAnalyzer
interface PRAnalysis { languages: string[]; fileGroups: DiffFile[]; summary: string; }
interface PRAnalyzer {
  analyze(diff: PRDiff): Promise<PRAnalysis>;
}

// Contract: LLMReviewer
interface ReviewComment { path: string; line: number; severity: 'block'|'warn'|'nit'; body: string; }
interface ReviewResult { comments: ReviewComment[]; summary: string; }
interface LLMReviewer {
  review(analysis: PRAnalysis): Promise<ReviewResult>;
}

// Contract: CommentPoster
interface CommentPoster {
  post(repo: string, prNumber: number, result: ReviewResult): Promise<{ postedCount: number }>;
}
```

## Data flow

flow: PR event → fetch diff → analyze → generate review → post comment

1. `WebhookHandler.handle(headers, body)` → `WebhookEvent`
2. `DiffFetcher.fetch(event.repo, event.prNumber)` → `PRDiff`
3. `PRAnalyzer.analyze(diff)` → `PRAnalysis`
4. `LLMReviewer.review(analysis)` → `ReviewResult`
5. `CommentPoster.post(repo, prNumber, result)` → acknowledgment

Each stage's output is the next stage's input, so the data flow is a single
pipeline with no hidden side channels. The contracts above are the seams.
Because interfaces are fixed first, you can stub any component (e.g. a fake
`LLMReviewer` returning canned comments) and still run the whole pipeline
end-to-end — that is the point of specifying interfaces before implementing.