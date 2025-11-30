# The Learn Master - Honest Learning Platform

> **Save hours of research.** We find and organize the best learning resources for any topic you want to master.

**Version:** 3.0 (Strategic Integration)  
**Status:** ✅ Hub 90% Complete, Satellite A 40% Complete  
**Last Updated:** November 30, 2025

---

## 🎯 What This Platform Is

The Learn Master is a **self-generating, verified online encyclopedia of professional knowledge** built on a Hub & Spoke architecture. We don't just answer questions—we build permanent learning assets that grow with every user request.

**Core Principle:** "Research Once, Teach Forever."

---

## 🏛️ The Vision

### The Living Library
Every user request generates a structured, 28-module course that's saved to our permanent library. The next user gets the content instantly. The library grows with every query.

### The Hub & Spoke Architecture
- **The Hub:** Central brain managing data, identity, content generation, and quality gates
- **Satellite A (Web Learning):** Current platform - custom learning path research service
- **Satellite B (AR/VR/Maps):** Planned - immersive, location-based learning experiences
- **Satellite C (Marketplace):** Planned - expert-filled content gaps for bounties

### The Flywheel
> "Consumption in one place creates Production in another."

Users discovering gaps in one satellite create bounties in the marketplace, which experts fill, making content available across all platforms. The wheel turns forever.

---

## 📚 Documentation Structure

### Strategic Documents

**[MASTER_STRATEGIC_PLAN.md](./MASTER_STRATEGIC_PLAN.md)**
- Complete strategic vision and business model
- Revenue streams (subscriptions, marketplace, referrals, data)
- Competitive moat and long-term vision
- **Read this first** to understand the big picture

**[ARCHITECTURE.md](./ARCHITECTURE.md)**
- Technical architecture and data flow
- Hub & Spoke system design
- Database schema and API structure
- Technology stack and infrastructure

**[IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)**
- Week-by-week implementation plan
- 7 phases from MVP to full platform
- Task breakdowns with time estimates
- Success metrics and risk management

**[FEATURE_STATUS_MATRIX.md](./FEATURE_STATUS_MATRIX.md)**
- Complete feature inventory with status
- Maps strategic vision to implementation
- Priority matrix and critical path
- Next actions and blockers

### Technical Documents

**[DEPLOY.md](./DEPLOY.md)**
- Deployment instructions
- Environment setup
- Production configuration

**[README.md](./README.md)** (this file)
- Quick start guide
- Current platform status
- Development setup

---

## 🚀 Quick Start

### Prerequisites
- Node.js 22.13.0 or higher
- pnpm (or npm/yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/BellasAI/the-learn-master.git
cd the-learn-master

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

### Environment Variables

Create a `.env` file in the project root:

```env
# Stripe Configuration (get from https://dashboard.stripe.com)
VITE_STRIPE_PUBLIC_KEY=pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE
```

---

## 📁 Project Structure

```
the-learn-master/
├── MASTER_STRATEGIC_PLAN.md      # Strategic vision and business model
├── ARCHITECTURE.md                # Technical architecture
├── IMPLEMENTATION_ROADMAP.md      # Week-by-week implementation plan
├── FEATURE_STATUS_MATRIX.md       # Feature inventory and status
├── README.md                      # This file
├── DEPLOY.md                      # Deployment instructions
├── src/
│   ├── components/                # Reusable UI components
│   │   ├── CompleteLearningJourney.jsx
│   │   ├── VideoPlayerWithTranscript.jsx
│   │   ├── StripeCheckout.jsx
│   │   └── DisclaimerModal.jsx
│   ├── pages/                     # Main application pages
│   │   ├── LandingPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── RequestPath.jsx
│   │   ├── LearningJourney.jsx
│   │   └── Profile.jsx
│   ├── lib/                       # Core business logic
│   │   ├── learning-path-architect.js    # Course generation
│   │   ├── content-gaps-library.js       # Gap detection
│   │   ├── multi-source-research.js      # Research aggregation
│   │   ├── quality-verification.js       # Content validation
│   │   ├── research-engine.js            # YouTube + web research
│   │   ├── content-safety.js             # Regulatory compliance
│   │   ├── formal-education.js           # Training provider integration
│   │   └── youtube-transcript.js         # Transcript extraction
│   └── App.jsx                    # Main app component
└── package.json                   # Dependencies
```

---

## ✅ What Works Right Now

### Core Features (Satellite A - Web Learning)

**Content Generation:**
- ✅ Custom learning path research for any topic
- ✅ Multi-source research (YouTube, web, academic)
- ✅ 28-module structured courses
- ✅ Video curation with precise timestamps
- ✅ Transcript extraction and analysis
- ✅ Supplementary resources (books, articles, courses)
- ✅ Formal education pathways (universities, bootcamps)

**Quality & Safety:**
- ✅ Gap detection during generation
- ✅ Quality verification before delivery
- ✅ Regulated profession detection
- ✅ "Theory Only" disclaimers
- ✅ Source attribution for all content

**User Experience:**
- ✅ Landing page with clear value proposition
- ✅ User dashboard with request history
- ✅ Learning path viewer with video player
- ✅ Tier-based request limits (Freemium, Starter, Advanced, Scholar)
- ✅ Stripe integration (frontend ready)

**Tracking & Analytics:**
- ✅ UTM tracking on all YouTube links
- ✅ Request usage tracking per tier

---

## ⏳ What's In Progress

### Backend Development (Phase 1 - Critical)
- ⏳ PostgreSQL database setup
- ⏳ Backend API (Node.js/Express or Python/FastAPI)
- ⏳ Real authentication (JWT)
- ⏳ Course persistence to database
- ⏳ Stripe webhook handlers

### Frontend Integration (Phase 2)
- ⏳ Connect frontend to backend API
- ⏳ Real payment processing
- ⏳ Progress tracking
- ⏳ Email notifications

### Marketplace Foundation (Phase 3)
- ⏳ Bounty posting system
- ⏳ Expert registration
- ⏳ Payment processing (Stripe Connect)

---

## 📋 What's Planned

### Short-Term (Next 3 Months)

**Phase 1: Complete The Hub (Weeks 1-3)**
- Backend API and database
- Real authentication
- Course persistence
- Referral engine completion

**Phase 2: Complete Satellite A (Weeks 4-7)**
- Frontend-backend integration
- Stripe payment processing
- Progress tracking
- Course catalog
- Email notifications

**Phase 3: Launch Satellite C - Marketplace (Weeks 8-13)**
- Bounty posting system
- Expert profiles and bidding
- Payment processing (80/20 split)
- Quality verification workflow

**Phase 4: Micro-Test Sampling (Weeks 14-16)**
- Generate Module 1 only for new topics
- Track demand metrics
- Auto-generate full course when demand proven
- **Expected savings:** 85% reduction in API costs

### Long-Term (Next 6-12 Months)

**Phase 5: Generational Interface (Weeks 17-20)**
- Age-adaptive content delivery
- "Jonny Mode" (age 6-12) - simplified, wonder-focused
- "Scott Mode" (age 60+) - detailed, safety-focused
- "Standard Mode" (age 13-59) - balanced

**Phase 6: Audio Narration (Weeks 21-23)**
- Eleven Labs integration
- Text-to-speech for all modules
- Audio-only learning mode
- Text-audio synchronization

**Phase 7: Satellite B - AR/VR Prototype (Weeks 24-36)**
- Mobile app (React Native or Unity)
- Geospatial database
- "Did You Know?" location-based notifications
- AR historical experiences
- Museum partnership pilot

---

## 💰 Revenue Model

### Stream A: Subscriptions

| Tier | Price | Requests/Month | Status |
|------|-------|----------------|--------|
| **Freemium** | Free | 1 | ✅ Live |
| **Starter** | $10/mo | 2 | ✅ Frontend ready |
| **Advanced** | $25/mo | 5 | ✅ Frontend ready |
| **Scholar** | $50/mo | 10 | ✅ Frontend ready |

**Implementation:** Frontend complete, backend pending (Phase 2, Week 5)

### Stream B: Gap Marketplace

**Model:** 20% commission on expert bounties
- Expert earns: 80% of bounty
- Platform earns: 20% of bounty
- Example: £20 bounty = £16 expert, £4 platform

**Implementation:** Gap detection complete, marketplace pending (Phase 3, Weeks 8-13)

### Stream C: Referral Engine

**Model:** Lead generation fees for training providers
- Gas Safe training: £50-200 per lead
- Electrical training: £30-150 per lead
- Professional certifications: £40-180 per lead

**Implementation:** Detection complete, referral links pending (Phase 1, Week 3)

### Stream D: Market Research Data

**Model:** Sell demand analytics to training providers, publishers, colleges
- Training Providers: £5,000-20,000/year
- Publishers: £10,000-50,000/year
- Colleges: £15,000-100,000/year

**Implementation:** Planned (Phase 4, Weeks 14-16)

---

## 🔧 Technology Stack

### Current Stack (Frontend)
- **React** 19.1.0 - UI framework
- **Vite** 6.3.5 - Build tool
- **Tailwind CSS** 4.1.7 - Styling
- **Radix UI** - Component library
- **Lucide React** 0.510.0 - Icons
- **React Router DOM** 7.6.1 - Routing
- **Stripe** (@stripe/stripe-js 8.1.0) - Payments

### Planned Stack (Backend)
- **Node.js + Express** OR **Python + FastAPI**
- **PostgreSQL** - Primary database
- **Redis** - Caching
- **Stripe Connect** - Marketplace payments
- **SendGrid/Mailgun** - Email notifications

### Planned Stack (Mobile - Satellite B)
- **React Native** OR **Unity**
- **WebXR** - AR experiences
- **Google Maps API** - Geospatial features
- **PostGIS** - Geospatial database

---

## 📊 Current Status

### The Hub: 90% Complete ✅

**Complete:**
- ✅ Content generation logic
- ✅ Gap detection system
- ✅ Quality verification
- ✅ Regulatory compliance
- ✅ Multi-source research

**Remaining:**
- ⏳ Backend database
- ⏳ Real authentication
- ⏳ Referral engine completion

### Satellite A (Web Learning): 40% Complete ⏳

**Complete:**
- ✅ Landing page
- ✅ User dashboard
- ✅ Learning path request
- ✅ Course viewer
- ✅ Stripe integration (frontend)

**Remaining:**
- ⏳ Backend integration
- ⏳ Progress tracking
- ⏳ Course catalog
- ⏳ Email notifications

### Satellite B (AR/VR): 0% Planned 📋

**Timeline:** Phase 7 (Weeks 24-36)

### Satellite C (Marketplace): 10% Foundation ⏳

**Complete:**
- ✅ Gap detection

**Remaining:**
- ⏳ Bounty posting
- ⏳ Expert profiles
- ⏳ Payment processing

---

## 🎯 Next Milestones

### This Week
1. Choose backend framework (Node.js or Python)
2. Set up PostgreSQL database
3. Implement authentication endpoints
4. Begin migration from localStorage

### This Month
1. Complete Phase 1 (The Hub)
2. Complete Phase 2 (Satellite A)
3. Launch MVP with real payments
4. Deploy to production

### This Quarter
1. Complete Phases 1-4
2. Launch marketplace (Satellite C)
3. Implement micro-test sampling
4. Achieve 85% cost reduction

---

## 🔐 Security

### Current Security

**✅ Good:**
- No secret keys in frontend code
- Environment variables for API keys
- Stripe handles payment processing
- No payment info stored locally

**⚠️ Needs Improvement:**
- Mock authentication (not secure)
- localStorage for user data
- No backend validation
- No rate limiting

### Required for Production

**Must Add:**
- Real authentication system (JWT + refresh tokens)
- Backend API with database
- HTTPS/SSL certificate
- Webhook signature verification (Stripe)
- Rate limiting (prevent abuse)
- Input validation and sanitization
- GDPR compliance (data privacy)
- Terms of Service and Privacy Policy

---

## 🤝 Contributing

This is a private project. If you're working on it:

### Development Workflow

1. Read the strategic documents first
2. Check the Implementation Roadmap for current phase
3. Review the Feature Status Matrix for priorities
4. Create feature branch
5. Make changes
6. Test thoroughly
7. Update documentation
8. Commit with clear messages
9. Deploy to staging
10. Test in production-like environment
11. Deploy to production

### Code Style

- Use Tailwind CSS for styling
- Follow React best practices
- Keep components small and focused
- Comment complex logic
- Update documentation for new features

---

## 📞 Support

### For Users

**Email:** support@learnmaster.com (set this up!)

**Response Time:**
- Freemium: 48-72 hours
- Starter: 24-48 hours
- Advanced: 24-48 hours
- Scholar: 12-24 hours

### For Developers

See documentation files:
- `MASTER_STRATEGIC_PLAN.md` - Strategic vision
- `ARCHITECTURE.md` - Technical architecture
- `IMPLEMENTATION_ROADMAP.md` - Implementation plan
- `FEATURE_STATUS_MATRIX.md` - Feature status

---

## 🌟 Core Values

1. **Honesty** - We only show features that work
2. **Quality** - We curate the best resources, not just the most
3. **Verification** - All content grounded in verifiable sources
4. **Time-Saving** - We save users hours of research
5. **Transparency** - Clear about limitations and pricing
6. **Value** - Deliver what we promise

---

## 🏆 Competitive Moat

**Why The Learn Master Wins:**

1. **The Flywheel:** Competitors build content. We make users build it for us.
2. **The Quality Gate:** Competitors show raw AI. We show verified truth.
3. **The Hub & Spoke:** Competitors build monoliths. We build modular satellites.
4. **The Generational Interface:** Competitors serve one audience. We serve all ages.
5. **The Immersive Layer:** Competitors teach in classrooms. We teach in the world.
6. **The Life CV:** Competitors track courses. We track lifelong competence.
7. **The Source Grounding:** Competitors hallucinate. We cite official syllabuses.

**The Result:**
> "Once the wheel starts spinning, it becomes impossible to stop."

---

## 📄 License

Private project - All rights reserved

---

## 🎉 Success Metrics

### What We Track

**User Metrics:**
- Research requests submitted
- Topics requested
- Upgrade rate (freemium → paid)
- Churn rate
- Course completion rate

**Business Metrics:**
- Monthly recurring revenue (MRR)
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Conversion rate
- Marketplace revenue

**Quality Metrics:**
- Link click-through rate
- User satisfaction
- Support ticket volume
- Content quality scores

---

**Built with honesty. Powered by research. Designed for learners.** 🚀

---

**Ready to start?** Follow the Quick Start guide above!

**Want to understand the vision?** Read `MASTER_STRATEGIC_PLAN.md`!

**Need implementation details?** Check `IMPLEMENTATION_ROADMAP.md`!

**Looking for feature status?** See `FEATURE_STATUS_MATRIX.md`!

---

Last updated: November 30, 2025  
Version: 3.0 (Strategic Integration)  
Status: ✅ Hub 90% Complete, Ready for Backend Development
