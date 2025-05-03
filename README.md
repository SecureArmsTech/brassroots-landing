````markdown
# BrassRoots Landing Page

_A privacy-first, censorship-resistant 2A-marketplace wait-list funnel_

[![Vercel Deployment](https://vercel.com/api/v1/badges/prj_ewn7kN0WZqcgZA2qoQgFuDbh55eE/deploy-status)](https://vercel.com/securearmstech/brassroots-landing)  
[![Build Status](https://github.com/SecureArmsTech/brassroots-landing/actions/workflows/ci.yml/badge.svg)](https://github.com/SecureArmsTech/brassroots-landing/actions)  
[![Mailerlite Subscribers](https://img.shields.io/badge/MailerLite–pilot_waitlist-blue)](https://app.mailerlite.com/subscribers/groups/152604189888874269)

**Live Demo:** <https://www.brassroots.market>

---

## Quick Start

```bash
git clone git@github.com:SecureArmsTech/brassroots-landing.git
cd brassroots-landing
cp .env.example .env.local
# Then edit .env.local to include actual API keys
npm install
npm run dev
````

---

## End-to-End Testing

We use [Playwright](https://playwright.dev/) for E2E testing.

### Run tests locally

```bash
# Run with dev server automatically handled
npx playwright test
```

* Tests live in the `tests/` directory.
* Configuration: [`playwright.config.ts`](playwright.config.ts)

---

## CI/CD

We use **GitHub Actions** and **Vercel** for continuous integration and deployment:

### GitHub Actions (`.github/workflows/ci.yml`)

* **Triggers:** Pull requests and pushes to `main`
* **Steps:**

  * `npm ci`
  * `npm run lint`
  * `npx playwright install --with-deps`
  * `npx playwright test`
  * `npm run build`
* Uses GitHub repo **secrets** for critical environment variables:

  * `MAILERLITE_API_KEY`
  * `MAILERLITE_LIST_ID`

### Vercel Deployment

* Auto-deploys every successful push to `main`
* Production: [https://www.brassroots.market](https://www.brassroots.market)
* **Environment Variables** managed via Vercel dashboard under
  `Settings → Environment Variables`

---

## Project Status

✅ CI/CD passing
✅ E2E test verifying wait-list submission attribution
✅ Main branch protected
🚧 Additional tests & features in progress

---

## License

[MIT](LICENSE)

````

---
