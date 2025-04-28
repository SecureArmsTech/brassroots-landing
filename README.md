<!-- test-protection-2 for verifying branch rules -->

```markdown
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
npm install
npm run dev
```

## CI/CD

We use GitHub Actions + Vercel for continuous delivery:

1. **GitHub Actions** (`.github/workflows/ci.yml`)  
   - Triggers on PRs and pushes to `main`.  
   - Steps: `npm ci`, `npm run lint`, (optional) `npm run test`, `npm run build`.  
   - Blocks merges on failure.  

2. **Vercel**  
   - Auto-deploys every successful push to `main` at <https://www.brassroots.market>.  
   - Environment variables are managed in the Vercel dashboard under **Settings → Environment Variables**.

Badge:  
[![Build Status](https://github.com/SecureArmsTech/brassroots-landing/actions/workflows/ci.yml/badge.svg)](https://github.com/SecureArmsTech/brassroots-landing/actions)

```
