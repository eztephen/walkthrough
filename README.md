# Walkthrough

Property inspection reports that write themselves. Walk the property on your phone, tap a condition for each room, take photos as you go — and the owner report, maintenance schedule and quote requests are ready before you reach the car.

This is the **sales prototype**: a working demo with a sample property pre-loaded, built to show to property managers. Nothing is saved; a refresh resets it.

Next.js 16, React 19, Tailwind CSS v4, TypeScript.

## Getting started

Requires Node.js >= 20.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Trying it on your phone

Camera capture is the point of the product, so test on a real phone. Start the dev server on your network:

```bash
npm run dev -- -H 0.0.0.0
```

Then open `http://<your-computer's-LAN-IP>:3000` on the phone, on the same Wi-Fi. **Add photo** opens the rear camera directly.

For prospects, deploy it (below) — never demo from localhost.

## Selling it

- **[`docs/outreach-email.md`](docs/outreach-email.md)** — first email, follow-up and LinkedIn note, plus the rules for sending cold email.
- **[`docs/demo-script.md`](docs/demo-script.md)** — the three-minute in-person demo, built around the timer, and honest answers to the questions agencies ask.

## Changing the sample

- **`src/lib/sample-property.ts`** — the pre-loaded property, its rooms, and `manualBaselineMinutes` (the "your last one by hand" figure the timer is compared against).
- **`src/lib/trades.ts`** — trades and their ballpark estimates in the maintenance schedule.
- **`src/app/globals.css`** — colours. Light and dark themes follow the device setting.

## What the prototype deliberately doesn't do

The gap between this and something an agency can run their business on:

- **Persistence** — no database. Every inspection vanishes on refresh.
- **Accounts and a property list** — one hard-coded property, no sign-in.
- **Real delivery** — the owner report prints to PDF from the browser; nothing is emailed. "Send quote requests" only shows a confirmation.
- **Photo storage** — photos stay in the browser's memory as blob URLs.
- **Offline** — needs a connection to load, though it keeps working once loaded.

Show it to five property managers before building any of these. Their requests should decide the order.

## Deploy

Push to a Git host and import the repo on [Vercel](https://vercel.com/new). The deployed URL is what goes in the outreach email.
