# T-Mobile Smart Device Upgrade Tracker

A telecom-focused, full-stack reference application that simulates an internal
T-Mobile retail tool. A representative looks up a customer by phone number or
account ID and can:

- View **device upgrade eligibility**
- View **contract end date, remaining balance, and plan**
- Check the **trade-in value** of the current (or any) device
- Browse **recommended upgrade devices**
- **Submit an upgrade request**

The project is intentionally built as a **React frontend + 3 independent
Node.js/Express microservices**, with all data held **in-memory** (no external
database), so it runs anywhere with zero setup.

> ⚠️ This is a portfolio/demo project. It is not affiliated with T-Mobile and
> uses fictional, mock data only.

---

## Architecture

```
┌──────────────────────────┐
│   React (Vite) frontend  │   Deployed on Vercel
│   Axios · Tailwind · RR  │
└─────────────┬────────────┘
              │  HTTP (env-configured base URLs)
   ┌──────────┼───────────────────────────┐
   ▼          ▼                            ▼
┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ Account Service│ │ Device Service │ │ Upgrade Service│
│  (port 4001)   │ │  (port 4002)   │ │  (port 4003)   │
│ /account/:id   │ │ /device/...    │ │ /upgrade/...   │
└────────────────┘ └────────────────┘ └────────────────┘
   In-memory data      In-memory data     In-memory store
```

Each microservice is a standalone Express app with its own `package.json`,
CORS, request logging (`morgan`), centralized error handling, and a `/health`
endpoint. They can be deployed and scaled independently.

---

## Project Structure

```
TelecomApp/
├── README.md
├── frontend/                       # React + Vite app (deploy to Vercel)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vercel.json                 # SPA rewrite for client-side routing
│   ├── .env.example                # API base URLs
│   ├── public/
│   │   └── favicon.svg
│   └── src/
│       ├── main.jsx                # App entry + providers
│       ├── App.jsx                 # Routes
│       ├── index.css               # Tailwind + component classes
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── AccountSummaryCard.jsx
│       │   ├── EligibilityCard.jsx
│       │   ├── TradeInCard.jsx
│       │   ├── DeviceCard.jsx
│       │   ├── UpgradeForm.jsx
│       │   ├── StatusBadge.jsx
│       │   └── Loader.jsx
│       ├── pages/
│       │   ├── LookupPage.jsx
│       │   └── DashboardPage.jsx
│       ├── context/
│       │   └── AccountContext.jsx  # Shared account/eligibility state
│       ├── services/
│       │   ├── apiClients.js       # One Axios client per microservice
│       │   └── upgradeService.js   # API call functions
│       └── utils/
│           └── format.js           # Currency/date helpers
│
└── backend/
    ├── package.json                # Convenience scripts (run all services)
    ├── account-service/
    │   ├── package.json
    │   ├── .env.example
    │   └── src/
    │       ├── index.js
    │       ├── routes/accountRoutes.js
    │       ├── middleware/errorHandler.js
    │       └── data/accounts.js
    ├── device-service/
    │   ├── package.json
    │   ├── .env.example
    │   └── src/
    │       ├── index.js
    │       ├── routes/deviceRoutes.js
    │       ├── middleware/errorHandler.js
    │       └── data/devices.js
    └── upgrade-service/
        ├── package.json
        ├── .env.example
        └── src/
            ├── index.js
            ├── routes/upgradeRoutes.js
            ├── middleware/errorHandler.js
            └── store/upgradeRequests.js
```

---

## Prerequisites

- **Node.js 18+** and npm

---

## Running Locally

### 1. Start the backend microservices

Each service is independent. Open three terminals (or use the convenience
runner described below).

**Terminal 1 — Account Service**
```bash
cd backend/account-service
npm install
npm start            # http://localhost:4001
```

**Terminal 2 — Device Service**
```bash
cd backend/device-service
npm install
npm start            # http://localhost:4002
```

**Terminal 3 — Upgrade Service**
```bash
cd backend/upgrade-service
npm install
npm start            # http://localhost:4003
```

#### Optional: run all three with one command

```bash
cd backend
npm install              # installs "concurrently"
npm run install:all      # installs deps for all three services
npm run dev              # starts account + device + upgrade together
```

Verify a service is up:
```bash
curl http://localhost:4001/health
```

### 2. Start the React frontend

```bash
cd frontend
npm install
cp .env.example .env     # Windows: copy .env.example .env
npm run dev              # http://localhost:5173
```

Open http://localhost:5173 and try a sample account such as **`ACC-100245`**
or phone **`206-555-0142`**.

---

## Environment Variables

### Frontend (`frontend/.env`)

| Variable                | Description                          | Local default            |
| ----------------------- | ------------------------------------ | ------------------------ |
| `VITE_ACCOUNT_API_URL`  | Base URL of the Account Service      | `http://localhost:4001`  |
| `VITE_DEVICE_API_URL`   | Base URL of the Device Service       | `http://localhost:4002`  |
| `VITE_UPGRADE_API_URL`  | Base URL of the Upgrade Service      | `http://localhost:4003`  |

> Vite only exposes variables prefixed with `VITE_` to the browser.

### Backend (each service's `.env`)

| Variable      | Description                                              | Default        |
| ------------- | ------------------------------------------------------- | -------------- |
| `PORT`        | Port the service listens on                             | service-specific |
| `CORS_ORIGIN` | Comma-separated allowlist of origins (e.g. Vercel URL). | `*` (all)      |

---

## API Documentation

All responses are JSON. Successful responses use a `{ "data": ... }` envelope;
errors use `{ "error": { "message", "statusCode" } }`.

### Account Service — `http://localhost:4001`

#### `GET /account/:id`
`:id` may be an **account ID** (`ACC-100245`) or a **phone number**
(`206-555-0142`).

```bash
curl http://localhost:4001/account/ACC-100245
```
```json
{
  "data": {
    "accountId": "ACC-100245",
    "phoneNumber": "206-555-0142",
    "customer": { "firstName": "Maria", "lastName": "Hernandez", "loyaltyTier": "Magenta Plus", "...": "..." },
    "plan": { "name": "Go5G Plus", "monthlyPrice": 90.0 },
    "contract": { "startDate": "2023-05-01", "endDate": "2025-05-01", "termMonths": 24 },
    "billing": { "remainingDeviceBalance": 0.0, "accountBalance": 0.0 },
    "device": { "model": "iPhone 13 Pro", "storage": "256GB" }
  }
}
```

### Device Service — `http://localhost:4002`

#### `GET /device/eligibility/:id`
Returns upgrade eligibility plus the recommended upgrade catalog.
`:id` may be an account ID or phone number.

```bash
curl http://localhost:4002/device/eligibility/ACC-100245
```
```json
{
  "data": {
    "accountId": "ACC-100245",
    "eligible": true,
    "reason": "Device fully paid off and contract within upgrade window.",
    "eligibleDate": "2025-05-01",
    "upgradeProgramPercentComplete": 100,
    "recommendedDevices": [ { "id": "DEV-IP16PRO", "name": "iPhone 16 Pro", "...": "..." } ]
  }
}
```

#### `GET /device/tradein/:model`
```bash
curl http://localhost:4002/device/tradein/iPhone%2013%20Pro
```
```json
{
  "data": {
    "model": "iPhone 13 Pro",
    "baseValue": 430,
    "estimatedLow": 301,
    "estimatedHigh": 430,
    "condition": "Good",
    "currency": "USD",
    "note": "Final value confirmed after device inspection."
  }
}
```

### Upgrade Service — `http://localhost:4003`

#### `POST /upgrade/submit`
Required fields: `accountId`, `selectedDeviceId`, `selectedDeviceName`.

```bash
curl -X POST http://localhost:4003/upgrade/submit \
  -H "Content-Type: application/json" \
  -d '{
    "accountId": "ACC-100245",
    "customerName": "Maria Hernandez",
    "selectedDeviceId": "DEV-IP16PRO",
    "selectedDeviceName": "iPhone 16 Pro",
    "tradeInModel": "iPhone 13 Pro",
    "tradeInValue": 430,
    "contactEmail": "maria.hernandez@example.com",
    "notes": "Prefers in-store pickup"
  }'
```
```json
{
  "data": {
    "referenceId": "UPG-2026-1001",
    "status": "SUBMITTED",
    "submittedAt": "2026-06-23T18:00:00.000Z",
    "accountId": "ACC-100245",
    "selectedDeviceName": "iPhone 16 Pro"
  },
  "message": "Upgrade request UPG-2026-1001 submitted successfully."
}
```

#### `GET /upgrade/requests`
Lists all submitted requests (internal agent view).

#### `GET /upgrade/requests/:referenceId`
Fetch a single request by reference ID.

> **Note:** Upgrade requests are stored in memory and reset when the service
> restarts.

---

## Sample Data

| Account ID   | Phone          | Customer         | Eligible? | Current Device        |
| ------------ | -------------- | ---------------- | --------- | --------------------- |
| `ACC-100245` | `206-555-0142` | Maria Hernandez  | ✅ Yes    | iPhone 13 Pro         |
| `ACC-100246` | `312-555-0188` | James Okafor     | ❌ No     | Samsung Galaxy S22    |
| `ACC-100247` | `646-555-0107` | Aisha Patel      | ✅ Yes    | iPhone 14             |
| `ACC-100248` | `415-555-0173` | Daniel Kim       | ❌ No     | Google Pixel 7        |

Trade-in models available: iPhone 13 Pro, iPhone 14, iPhone 12, Samsung Galaxy
S22, Samsung Galaxy S21, Google Pixel 7.

---

## Deployment

### Frontend → Vercel

1. Push this repo to GitHub.
2. In Vercel, **New Project → Import** the repo.
3. Set **Root Directory** to `frontend`.
   - Framework preset: **Vite** (auto-detected)
   - Build command: `npm run build`
   - Output directory: `dist`
4. Add **Environment Variables** (Production + Preview):
   - `VITE_ACCOUNT_API_URL` = your deployed Account Service URL
   - `VITE_DEVICE_API_URL` = your deployed Device Service URL
   - `VITE_UPGRADE_API_URL` = your deployed Upgrade Service URL
5. **Deploy.** `vercel.json` already rewrites all routes to `index.html` so
   client-side routing (React Router) works on refresh/deep links.

### Backend → Render (or Railway)

Deploy **each microservice as its own service** (this is what makes it a real
microservices deployment).

**Render (per service):**
1. **New → Web Service**, connect the repo.
2. Set **Root Directory** to e.g. `backend/account-service`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variable `CORS_ORIGIN` = your Vercel URL
   (e.g. `https://your-app.vercel.app`).
6. Render assigns a `PORT` automatically — the code reads `process.env.PORT`.
7. Repeat for `device-service` and `upgrade-service`.

**Railway** is equivalent: create a service per folder, set the root directory,
start command `npm start`, and add `CORS_ORIGIN`.

After deploying, copy each service's public URL into the matching
`VITE_*_API_URL` env var in Vercel and redeploy the frontend.

> **CORS:** For production, set each service's `CORS_ORIGIN` to your Vercel
> domain. Leaving it unset allows all origins, which is fine for a quick demo
> but not recommended for anything real.

---

## Tech Stack

**Frontend:** React 18, Vite, React Router, Axios, Tailwind CSS, Context API.
**Backend:** Node.js, Express, Morgan (logging), CORS — three independent
services, in-memory data.

---

## Notes & Design Decisions

- **Why Vite over Next.js?** This is a client-rendered internal tool that talks
  to separate backend services; Vite gives the simplest, fastest Vercel static
  deploy without needing SSR.
- **Why three separate Express apps?** To genuinely demonstrate a microservices
  architecture (independent deploy/scale, isolated failure domains, clear
  bounded contexts) rather than a single monolith with route prefixes.
- **Consistent API contract** (`data` / `error` envelopes, `/health` checks,
  centralized error middleware) across all services makes the frontend client
  layer uniform and easy to reason about.
- **In-memory data** keeps the project zero-dependency to run; the upgrade store
  is written behind a small repository-style module so it could be swapped for a
  real database without touching the route handlers.
