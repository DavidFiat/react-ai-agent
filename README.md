# Linear + GitHub Automation: User Directory Dashboard (Fuse Take-Home)

This repository implements a production-grade automation pipeline that connects Linear task tracking with GitHub versioned storage, exposing user data through a static dashboard. The core intent is to enable stakeholders to create or update user records via Linear issues, have an intelligent agent validate and translate those into GitHub pull requests, and surface the resulting state immediately on a frontend without manual intervention.

---

## 1. Architecture Process

### Goal

Create an AI Agent which will be able to add/update ( never delete ) information to that json file from a [Linear task] (https://linear.app).
Listen task with an specific labels / projects ( up to you ) in Linear
Triggers an agent that should be able to :
Check if it's able to do the task ( avoid task that are not in the scope)
If it's able to do and need more information, ask about this
If it's able to do and have the right context do the task and create a PR review in a github repository
if it's not able to do the task, reply in the a comment that it is not able to help and the reason


Linear issue → validation & parsing → Linear Issue answered → GitHub pull request → canonical `users.json` update → frontend reflection.

### High-level flow

1. **Task Ingestion**: Linear issues with defined naming conventions and content are received via webhook.
2. **Scope & Validation**: An agent evaluates whether the issue is actionable:
   - Titles must start with `Add User` or `Update User`.
   - Body must contain key-value pairs. Required fields are validated (e.g., email format, date format).
   - If insufficient, the agent comments asking for clarifications; if out of scope, it explains why no action will be taken.
3. **Transformation**: The issue content is parsed into structured fields. Existing user lookups are done (e.g., by unique identifiers like id) to decide between creation or update.
4. **Git Integration**:
   - A dedicated branch is created following a deterministic naming pattern.
   - `src/data/users.json` is modified (append or merge update) in that branch.
   - A pull request is opened or reused against `main` with the diff.
5. **Feedback Loop**:
   - Comment on the originating Linear issue with the PR link, outcome, and any errors.
   - Transition the Linear issue to a terminal state (e.g., “Done”) on success.
6. **Delivery**:
   - After PR merge, the canonical `users.json` reflects the change.
   - The React frontend hosted on GitHub Pages reads the raw JSON and updates its UI.

### Design principles applied

- **Single Source of Truth**: `users.json` in GitHub is the authoritative user directory.
- **Observable Feedback**: Every step surfaces outcomes back to the user in Linear and in PRs history.
- **Separation of Concerns**: Issue parsing, Git orchestration, and frontend presentation are decoupled via clear interfaces.


---

## 2. Platform Decisions


### Hosting Frontend: GitHub Pages

GitHub Pages was selected because it delivers static content globally with zero infrastructure maintenance, versioned alongside the source of truth. The frontend reads the raw `users.json` directly from the repository, eliminating synchronization layers or additional APIs. This reduces attack surface, lowers cost to zero for hosting, and leverages existing Git workflows for content promotion.

### Backend: Node.js + Express

Express on Node.js is used for the webhook agent because it provides a minimal, high-throughput, event-driven HTTP surface that can:
- Parse and validate incoming Linear webhook payloads.
- Orchestrate GitHub operations with deterministic branching and PR logic.
- Provide immediate feedback loops back to Linear.

Express was chosen over heavier frameworks because of its explicit control and low operational complexity; compared to serverless alternatives, it allows consistent runtime behavior, bundled dependencies, and easier debugging in a long-running environment.

### Domain + Load-Balanced Elastic Beanstalk (Node 18)

The backend is deployed as a load-balanced AWS Elastic Beanstalk environment running Node.js 18, exposed at the custom domain `https://webhook.react-ai-app-jhoan.online`, which forwards requests to path /webhook to the Elastic Beanstalk load balancer.

Rationale for this deployment model instead of Lambda or ECS:

- **Consistent HTTP Endpoint with Domain Routing**: The load-balanced Beanstalk environment ensures a stable HTTP domain for incoming webhooks, with built-in support for domain attachment, health checks, and TLS termination if configured. Webhook receivers benefit from predictable connection behavior and warm, always-on listeners, avoiding cold-start latency and concurrency pitfalls of Lambda under burst traffic or webhook retries.

- **Simplified Operational Surface**: Elastic Beanstalk abstracts provisioning, scaling, and environment variable management without needing to design a container orchestration layer (as with ECS) or build a custom API gateway + Lambda permission model. It retains the simplicity of a managed platform while still running a full Node 18 process suitable for stateful orchestration, logging, and rich error visibility.

- **Automatic Load Distribution and Failure Isolation**: Using a load balancer allows horizontal scaling behind the scene and keeps individual instance failures isolated, without custom autoscaling rules or cluster management. This simplifies capacity planning while maintaining resilience for webhook bursts.

- **Deployment and Rollback Simplicity**: Beanstalk supports versioned deployments and rollbacks out of the box, reducing release risk during iteration on webhook logic. In contrast, ECS would require defining task definitions, service pipelines, and potentially additional infra (ECR, ALBs) with more configuration surface.

### GitHub Integration: `@octokit/rest`

The official GitHub SDK provides robust, predictable interfaces for branch creation, committing diffs, PR lifecycle management, and comment threading. It supports idempotency (detecting existing PRs) and can be extended to implement merge policies, review automation, and status checks.

### Task Source: Linear API/Webhooks

Linear issues are the source of intent. Using webhooks avoids polling; the system treats issues as structured input. Comments and transitions create an audit trail directly attached to the original task, making compliance and traceability straightforward.

---

Responsibilities:

- **Agent Layer (backend)**: Validate Linear input, determine scope, parse content, manage Git operations, and communicate status back to Linear.
- **Git Layer**: Handle branch naming, diff creation, PR lifecycle, merge detection, and idempotent operations.
- **Frontend**: Present the current state of `users.json`.

---

## 3. Deployment Instructions

### Prerequisites

- Node.js >= 18
- GitHub personal access token with `repo` scope
- Linear API key with necessary permissions
- AWS CLI configured with credentials for the target account

### Required Environment Variables

Populate a `.env` file (do not commit secrets):

env
# GitHub
GH_USER=your-github-username
GH_REPO=react-ai-agent
GH_TOKEN=your-personal-access-token

# Linear
LINEAR_API_KEY=your-linear-api-key



## 4. Test Cases for app.js Agent

## Assumptions / Setup
- Environment variables set: `GH_USER`, `GH_REPO`, `GH_TOKEN`, `PORT`
- Linear webhook posts to `/webhook` with payload containing `{ type: "Issue", data: issue }`
- `users.json` exists at `src/data/users.json` and is a JSON array of user objects.
- Valid issue identifiers (e.g., `identifier` field) are provided.
- `postLinearComment` and `transitionLinearIssue` behave as expected.

---

## A. Successful Add User

**Input Linear Issue**
- Title: `Add User - Jane Smith`
- Description: `name: Jane Smith, email: jane@org.com, age: 29, occupation: Analyst, location: Toronto, joinDate: 2022-07-15, status: Active, department: Ops, manager: Carl`


**Expected Outcomes**
- Parses details into object (all required USER_FIELDS present).
- `users.json` is read and new user appended with a new `id`.
- Branch created: `user/add-123`.
- File update committed via GitHub API with message `Add user <new_id>`.
- Pull request created titled `Add User <new_id>` (or reused if already exists).
- Linear issue commented with `PR: <url>`.
- Linear issue transitioned to `Done`.
- HTTP 200 returned.

## B. Successful Update User

**Precondition**
- `users.json` contains a user with `id: 5`.

**Input Linear Issue**
- Title: `Update User - Something`
- Description: `id: 5, name: Jorge  Cabrera, email: jorgeupdated@example.com, age: 32, occupation: Analyst, location: Cali, joinDate: 2022-07-15, status: Active, department: Ops, manager: Ricki`

**Expected Outcomes**
- Finds existing user by `id` (5).
- Updates only provided fields (`email`, `location`).
- Branch created: `user/upd-456`.
- GitHub commit with message `Update user 5`.
- PR created or reused.
- Linear issue receives comment with PR link.
- Linear issue transitioned to `Done`.
- HTTP 200 returned.


## C. Missing Required Fields on Add

**Input Linear Issue**
- Title: `Add User - Bob`
- Description: `name: Bob Jones, email: bob@example.com, occupation: Developer`

**Expected Outcomes**
- `parseDetails` returns an object, but required USER_FIELDS for add are missing several.
- Agent posts comment: `Missing fields: age, location, joindate, status, department, manager. Please update.`
- No GitHub operations performed.
- Issue is not transitioned to Done.
- HTTP 200 returned.


## D. Malformed Description (cannot parse)

**Input Linear Issue**
- Title: `Add User - Charlie`
- Description: empty string or gibberish not containing `key: value` pairs.


**Expected Outcomes**
- `parseDetails` returns `null`.
- Comment: `Could not parse user details. Use format key: value, ...`


[VIDEO LINK](https://drive.google.com/open?id=1xsUU5XRSiAzfddFPrj_XwFvmOWc8LVCr&usp=drive_fs)
