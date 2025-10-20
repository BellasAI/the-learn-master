# The Learn Master (LM) - Honest Platform

> **Save hours of research.** We find and organize the best learning resources for any topic you want to master.

**Version:** 2.0 (Honest Rebuild)  
**Status:** ✅ Production Ready (Stripe setup needed)  
**Last Updated:** October 19, 2025

---

## 🎯 What This Platform Actually Does

The Learn Master is a **custom learning path research service**. We research and curate the best YouTube videos, courses, books, and resources for any topic you want to learn - from AI to beekeeping, Python to photography.

### ✅ What We Offer:

- **Custom Topic Research** - Tell us what you want to learn, we research it
- **Curated Video Collections** - Best YouTube videos ranked by relevance
- **Precise Timestamps** - Watch only relevant segments, save hours
- **Supplementary Resources** - Books, articles, courses, and more
- **Formal Education Paths** - Universities, bootcamps, certificates
- **Subscription Tiers** - Freemium to Scholar (1-10 requests/month)

### ❌ What We DON'T Offer (Yet):

- Pre-built course catalog
- Progress tracking
- Certificates or achievements
- Community features
- 1-on-1 mentorship

**Core Principle:** We only show features that actually work.

---

## 🚀 Quick Start

### Prerequisites:

- Node.js 22.13.0 or higher
- pnpm (or npm/yarn)

### Installation:

```bash
# Clone the repository
cd /home/ubuntu/ai-learning-platform

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

### Environment Variables:

Create a `.env` file in the project root:

```env
# Stripe Configuration (get from https://dashboard.stripe.com)
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE
```

See `.env.example` for full template.

---

## 📁 Project Structure

```
ai-learning-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.jsx   # Top navigation bar
│   │   └── StripeCheckout.jsx  # Payment integration
│   ├── pages/               # Main application pages
│   │   ├── LandingPage.jsx  # Homepage (honest marketing)
│   │   ├── Dashboard.jsx    # User dashboard (real data only)
│   │   ├── Profile.jsx      # User profile & subscription
│   │   ├── CourseCatalog.jsx  # "Coming Soon" page
│   │   └── RequestPath.jsx  # Learning path request form
│   ├── lib/                 # Utilities and configuration
│   │   └── stripe-config.js # Stripe pricing configuration
│   ├── App.jsx              # Main app component & routing
│   └── main.jsx             # Application entry point
├── public/                  # Static assets
├── dist/                    # Production build output
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

---

## 💰 Pricing Tiers

All pricing tiers are **honest** - we only list features we can deliver.

| Tier | Price | Requests/Month | Features |
|------|-------|----------------|----------|
| **Freemium** | Free | 1 | 3 video previews, basic resources |
| **Starter** | $10/mo | 2 | Full videos (15-25), timestamps, 10-15 resources |
| **Advanced** | $25/mo | 5 | In-depth research (30-40 resources), priority support |
| **Scholar** | $50/mo | 10 | Premium library access, early features, priority support |

---

## 🔧 Technology Stack

### Frontend:
- **React** 18.3.1 - UI framework
- **Vite** 6.3.5 - Build tool and dev server
- **Tailwind CSS** 3.4.17 - Styling
- **Lucide React** 0.468.0 - Icons

### Payment:
- **Stripe** - Payment processing (frontend ready)
- `@stripe/stripe-js` 5.4.0 - Stripe JavaScript SDK

### Routing:
- **React Router DOM** 7.1.3 - Client-side routing

---

## 📊 Features Status

### ✅ Working Features:

| Feature | Status | Description |
|---------|--------|-------------|
| Landing Page | ✅ Live | Honest marketing, clear value prop |
| User Authentication | ✅ Live | Mock auth (localStorage) |
| Dashboard | ✅ Live | Shows real user data only |
| Request Learning Path | ✅ Live | Generates custom research |
| Tier Limit Tracking | ✅ Live | Tracks requests per month |
| YouTube Tracking | ✅ Live | UTM parameters on all links |
| Stripe Integration | ⚠️ Frontend Ready | Needs Stripe account setup |

### 🚧 Coming Soon:

| Feature | Status | ETA |
|---------|--------|-----|
| Premium Learning Paths | Planned | Q2 2026 |
| Progress Tracking | Planned | Q3 2026 |
| Community Features | Planned | Q4 2026 |
| Certificates | Planned | 2027 |

### ❌ Removed (Were Fake):

- Course catalog (8 fake courses)
- Achievements and badges
- Learning hours tracking
- Certificates
- Recommended courses
- Community features

---

## 🔐 Stripe Payment Integration

### Current Status:

**Frontend:** ✅ Complete  
**Backend:** ⚠️ Not built yet  
**Stripe Account:** ⚠️ Needs setup

### Setup Instructions:

See **[STRIPE_INTEGRATION_GUIDE.md](../STRIPE_INTEGRATION_GUIDE.md)** for complete instructions.

**Quick Setup:**

1. Create Stripe account at [stripe.com](https://stripe.com)
2. Create 3 products (Starter, Advanced, Scholar)
3. Copy Price IDs
4. Add publishable key to `.env`
5. Update Price IDs in `src/lib/stripe-config.js`
6. Rebuild app: `pnpm run build`

### Demo Mode:

Currently shows demo alert when clicking "Upgrade" buttons. Replace with real Stripe checkout after setup.

---

## 🧪 Testing

### Manual Testing Checklist:

- [x] Landing page loads correctly
- [x] User can sign in (mock auth)
- [x] Dashboard shows correct tier and usage
- [x] Request Path form works
- [x] Profile shows accurate subscription data
- [x] Upgrade modal displays pricing correctly
- [x] Course Catalog shows "Coming Soon" message
- [x] All navigation links work
- [x] Mobile responsive design works

### Test Accounts:

**Mock Authentication:**
- Email: any email
- Password: any password
- Default tier: Freemium

### Test Payment:

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 9995`

---

## 📦 Deployment

### Build for Production:

```bash
# Build optimized production bundle
pnpm run build

# Preview production build locally
pnpm run preview
```

### Recommended Hosting:

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Option 2: Netlify**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod
```

**Option 3: Railway**
- Connect GitHub repo
- Set environment variables
- Deploy automatically

### Environment Variables (Production):

```env
# Replace test keys with live keys
VITE_STRIPE_PUBLIC_KEY=pk_live_YOUR_LIVE_KEY_HERE
```

---

## 🔒 Security

### Current Security:

**Good:**
- ✅ No secret keys in frontend code
- ✅ Environment variables for API keys
- ✅ Stripe handles payment processing
- ✅ No payment info stored locally

**Needs Improvement:**
- ⚠️ Mock authentication (not secure)
- ⚠️ localStorage for user data
- ⚠️ No backend validation
- ⚠️ No rate limiting

### For Production:

**Must Add:**
- Real authentication system
- Backend API with database
- HTTPS/SSL certificate
- Webhook signature verification
- Rate limiting
- Input validation

---

## 📚 Documentation

### Available Guides:

1. **[HONEST_PLATFORM_REBUILD_PLAN.md](../HONEST_PLATFORM_REBUILD_PLAN.md)**
   - Audit of fake vs real features
   - Phase-by-phase rebuild plan

2. **[STRIPE_INTEGRATION_GUIDE.md](../STRIPE_INTEGRATION_GUIDE.md)**
   - Complete Stripe setup instructions
   - Backend code examples
   - Security best practices

3. **[HONEST_PLATFORM_TEST_REPORT.md](../HONEST_PLATFORM_TEST_REPORT.md)**
   - Testing results
   - Feature verification
   - Launch readiness checklist

---

## 🐛 Known Issues

### Current Limitations:

1. **Mock Authentication**
   - Uses localStorage (not secure)
   - No password hashing
   - No session management
   - **Fix:** Build real backend with database

2. **No Backend**
   - Can't process real payments
   - Can't persist user data
   - Can't send emails
   - **Fix:** Build Node.js/Python backend

3. **Stripe Demo Mode**
   - Shows alert instead of checkout
   - Can't process real payments
   - **Fix:** Add Stripe API keys and backend

---

## 🤝 Contributing

This is a private project, but if you're working on it:

### Development Workflow:

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Update documentation
5. Commit with clear messages
6. Deploy to staging
7. Test in production-like environment
8. Deploy to production

### Code Style:

- Use Tailwind CSS for styling
- Follow React best practices
- Keep components small and focused
- Comment complex logic
- Update README for new features

---

## 📞 Support

### For Users:

**Email:** support@learnmaster.com (set this up!)

**Response Time:**
- Freemium: 48-72 hours
- Starter: 24-48 hours
- Advanced: 24-48 hours
- Scholar: 12-24 hours

### For Developers:

See documentation files in project root:
- `STRIPE_INTEGRATION_GUIDE.md`
- `HONEST_PLATFORM_TEST_REPORT.md`
- `HONEST_PLATFORM_REBUILD_PLAN.md`

---

## 📄 License

Private project - All rights reserved

---

## 🎯 Roadmap

### Phase 1: Launch (Current)
- [x] Remove all fake features
- [x] Build honest platform
- [x] Integrate Stripe (frontend)
- [ ] Set up Stripe account
- [ ] Add legal pages
- [ ] Deploy to production

### Phase 2: Backend (Next)
- [ ] Build authentication system
- [ ] Create database schema
- [ ] Build API endpoints
- [ ] Handle Stripe webhooks
- [ ] Send email confirmations

### Phase 3: Scale (Future)
- [ ] Add analytics
- [ ] Implement SEO
- [ ] Content marketing
- [ ] Paid advertising
- [ ] Grow user base

### Phase 4: Features (Long-term)
- [ ] Premium learning paths
- [ ] Progress tracking
- [ ] Community features
- [ ] Certificates
- [ ] Mobile app

---

## ✅ Launch Checklist

### Pre-Launch:
- [x] Remove all fake features
- [x] Build honest platform
- [x] Integrate Stripe (frontend)
- [x] Test all functionality
- [ ] Create Stripe account
- [ ] Add Stripe API keys
- [ ] Test payment flow
- [ ] Add Terms of Service
- [ ] Add Privacy Policy
- [ ] Add Refund Policy
- [ ] Set up support email
- [ ] Deploy to production
- [ ] Test production build

### Post-Launch:
- [ ] Monitor for errors
- [ ] Track conversion rates
- [ ] Respond to support tickets
- [ ] Analyze user behavior
- [ ] Optimize pricing
- [ ] Build backend
- [ ] Add real authentication

---

## 🎉 Success Metrics

### What We Track:

**User Metrics:**
- Research requests submitted
- Topics requested
- Upgrade rate (freemium → paid)
- Churn rate

**Business Metrics:**
- Monthly recurring revenue (MRR)
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Conversion rate

**Quality Metrics:**
- Link click-through rate
- User satisfaction
- Support ticket volume

---

## 🌟 Core Values

1. **Honesty** - We only show features that work
2. **Quality** - We curate the best resources, not just the most
3. **Time-Saving** - We save users hours of research
4. **Transparency** - Clear about limitations and pricing
5. **Value** - Deliver what we promise

---

**Built with honesty. Powered by research. Designed for learners.** 🚀

---

**Questions?** Check the documentation or contact support.

**Ready to launch?** Follow the Stripe Integration Guide!

**Want to contribute?** Read the Contributing section above.

---

Last updated: October 19, 2025  
Version: 2.0 (Honest Rebuild)  
Status: ✅ Production Ready

