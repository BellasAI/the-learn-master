# The Learn Master - Quick Reference Guide

**Last Updated:** November 30, 2025  
**Purpose:** Fast lookup for developers working on the platform

---

## 📚 Documentation Map

| Document | Purpose | When to Read |
|----------|---------|--------------|
| **README.md** | Quick start, current status, overview | First time setup |
| **MASTER_STRATEGIC_PLAN.md** | Strategic vision, business model, long-term goals | Understanding the big picture |
| **ARCHITECTURE.md** | Technical architecture, data flow, database schema | Building backend or new features |
| **IMPLEMENTATION_ROADMAP.md** | Week-by-week tasks, timelines, success metrics | Planning sprints |
| **FEATURE_STATUS_MATRIX.md** | Feature inventory, status, priorities | Checking what's done/planned |
| **QUICK_REFERENCE.md** | This file - fast lookup | Daily development |

---

## 🏗️ Architecture Quick View

### The Hub & Spoke Model

```
THE HUB (Central Brain)
├── Database (PostgreSQL)
├── Authentication (JWT)
├── Content Generation
├── Gap Detection
└── Quality Gates

SATELLITES (User-Facing)
├── Satellite A: Web Learning (40% complete)
├── Satellite B: AR/VR/Maps (0% planned)
└── Satellite C: Marketplace (10% complete)
```

---

## 📂 Key Files & Their Purpose

### Core Business Logic (`src/lib/`)

| File | Purpose | Status |
|------|---------|--------|
| `learning-path-architect.js` | Generates 28-module course structure | ✅ Complete |
| `content-gaps-library.js` | Detects missing content during generation | ✅ Complete |
| `multi-source-research.js` | Aggregates YouTube, web, academic sources | ✅ Complete |
| `quality-verification.js` | Validates content before delivery | ✅ Complete |
| `research-engine.js` | Main research orchestration | ✅ Complete |
| `content-safety.js` | Detects regulated professions, adds disclaimers | ✅ Complete |
| `formal-education.js` | Training provider integration | ⏳ 70% |
| `youtube-transcript.js` | Extracts transcripts from videos | ✅ Complete |
| `transcript-ai-analysis.js` | AI-powered transcript analysis | ✅ Complete |
| `stripe-config.js` | Stripe pricing tiers | ✅ Complete |

### Components (`src/components/`)

| File | Purpose | Status |
|------|---------|--------|
| `CompleteLearningJourney.jsx` | Main course viewer | ✅ Complete |
| `VideoPlayerWithTranscript.jsx` | Video player with timestamps | ✅ Complete |
| `StripeCheckout.jsx` | Payment modal | ⏳ Frontend only |
| `DisclaimerModal.jsx` | Regulatory disclaimers | ✅ Complete |

### Pages (`src/pages/`)

| File | Purpose | Status |
|------|---------|--------|
| `LandingPage.jsx` | Homepage | ✅ Complete |
| `Dashboard.jsx` | User dashboard | ✅ Complete |
| `RequestPath.jsx` | Learning path request form | ✅ Complete |
| `LearningJourney.jsx` | Course viewer page | ✅ Complete |
| `Profile.jsx` | User profile & subscription | ✅ Complete |
| `CourseCatalog.jsx` | Course library | ⏳ "Coming Soon" |

---

## 🗄️ Database Schema (Planned)

### Core Tables

**users**
```sql
id, email, password_hash, tier, requests_used, requests_limit, created_at
```

**courses**
```sql
id, topic, user_id, status, module_count, is_regulated, governing_body, disclaimer, created_at
```

**modules**
```sql
id, course_id, module_number, title, content (JSONB), videos (JSONB), resources (JSONB), estimated_time
```

**course_gaps**
```sql
id, course_id, gap_type, description, priority, bounty_amount, status, created_at
```

**course_demand_metrics**
```sql
id, course_id, topic, module_1_starts, module_1_completions, module_2_clicks, demand_score, status
```

**bounties**
```sql
id, gap_id, title, description, bounty_amount, status, expert_id, submission_url, created_at
```

**expert_profiles**
```sql
id, user_id, expertise_areas, reputation_score, bounties_completed, total_earned
```

**Full schema:** See `ARCHITECTURE.md`

---

## 🔌 API Endpoints (Planned)

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

### Users
```
GET    /api/users/me
PUT    /api/users/me
GET    /api/users/subscription
GET    /api/users/usage
```

### Courses
```
POST   /api/courses
GET    /api/courses
GET    /api/courses/:id
GET    /api/courses/:id/modules
GET    /api/courses/:id/modules/:moduleId
PATCH  /api/courses/:id/status
DELETE /api/courses/:id
```

### Gaps & Marketplace
```
GET    /api/gaps
GET    /api/courses/:id/gaps
POST   /api/gaps/:id/resolve
GET    /api/bounties
POST   /api/bounties/:id/claim
POST   /api/bounties/:id/submit
```

### Stripe
```
POST   /api/stripe/create-checkout
POST   /api/stripe/create-portal
POST   /api/webhooks/stripe
```

**Full API spec:** See `ARCHITECTURE.md`

---

## 💰 Pricing Tiers

| Tier | Price | Requests/Month | Features |
|------|-------|----------------|----------|
| **Freemium** | Free | 1 | 3 video previews, basic resources |
| **Starter** | $10/mo | 2 | Full videos (15-25), timestamps, resources |
| **Advanced** | $25/mo | 5 | In-depth research (30-40 resources), priority |
| **Scholar** | $50/mo | 10 | Premium access, early features, priority |

**Configuration:** `src/lib/stripe-config.js`

---

## 🚀 Development Commands

### Local Development
```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server (http://localhost:5173)
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run lint         # Run ESLint
```

### Backend (When Ready)
```bash
# Node.js + Express
npm run dev           # Start backend server
npm run migrate       # Run database migrations
npm run seed          # Seed database with test data

# Python + FastAPI
uvicorn main:app --reload
alembic upgrade head  # Run migrations
```

---

## 🔑 Environment Variables

### Frontend (.env)
```env
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_API_URL=http://localhost:3000  # Backend API URL
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/learnmaster
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG...
OPENAI_API_KEY=sk-...
YOUTUBE_API_KEY=AIza...
```

---

## 📊 Current Status Summary

### Overall Completion
- **The Hub:** 90% complete (needs backend)
- **Satellite A:** 40% complete (needs backend integration)
- **Satellite B:** 0% planned
- **Satellite C:** 10% complete (gap detection only)

### Critical Blockers
1. Backend API and database (Phase 1)
2. Real authentication (Phase 1)
3. Stripe webhook handlers (Phase 2)

### Next Milestones
1. **This Week:** Choose backend framework, set up database
2. **This Month:** Complete Phase 1 & 2, launch MVP
3. **This Quarter:** Complete Phases 1-4, launch marketplace

---

## 🎯 Priority Matrix

### High Priority (Launch Blockers)
- Backend API and database
- Real authentication
- Stripe payment integration
- Course persistence
- Progress tracking

### Medium Priority (Revenue Generators)
- Gap marketplace
- Referral engine
- Micro-test sampling
- Audio narration

### Low Priority (Differentiators)
- Generational interface
- AR/VR experiences
- Life CV
- NotebookLM integration

---

## 🔍 Common Tasks

### Adding a New Feature

1. Check `FEATURE_STATUS_MATRIX.md` for status
2. Review `ARCHITECTURE.md` for technical approach
3. Check `IMPLEMENTATION_ROADMAP.md` for timeline
4. Create feature branch: `git checkout -b feature/feature-name`
5. Implement feature
6. Update documentation
7. Test thoroughly
8. Commit: `git commit -m "feat: add feature-name"`
9. Push and create PR

### Debugging Content Generation

**Key files:**
- `src/lib/learning-path-architect.js` - Main generation logic
- `src/lib/research-engine.js` - Research orchestration
- `src/lib/multi-source-research.js` - Source aggregation

**Common issues:**
- YouTube API quota exceeded → Check API key
- Transcript extraction fails → Check `youtube-transcript.js`
- Gap detection not working → Check `content-gaps-library.js`

### Testing Payment Flow

**Current status:** Demo mode (frontend only)

**To test:**
1. Click "Upgrade" button
2. See demo alert (no real payment)

**After backend:**
1. Use Stripe test cards
2. Success: `4242 4242 4242 4242`
3. Declined: `4000 0000 0000 9995`

---

## 🐛 Known Issues

### Current Limitations

1. **Mock Authentication**
   - Uses localStorage (not secure)
   - No password hashing
   - Fix: Build real backend (Phase 1)

2. **No Backend**
   - Can't process real payments
   - Can't persist user data
   - Fix: Build Node.js/Python backend (Phase 1)

3. **Stripe Demo Mode**
   - Shows alert instead of checkout
   - Fix: Add Stripe API keys and backend (Phase 2)

---

## 📞 Getting Help

### Internal Resources
- **Strategic Questions:** See `MASTER_STRATEGIC_PLAN.md`
- **Technical Questions:** See `ARCHITECTURE.md`
- **Implementation Questions:** See `IMPLEMENTATION_ROADMAP.md`
- **Feature Status:** See `FEATURE_STATUS_MATRIX.md`

### External Resources
- **React:** https://react.dev/
- **Vite:** https://vitejs.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Stripe:** https://stripe.com/docs
- **PostgreSQL:** https://www.postgresql.org/docs/

---

## 🎓 Key Concepts

### The Living Library
Every user request creates a permanent asset. The next user gets it instantly.

### The Flywheel
Consumption in one place creates production in another. The wheel turns forever.

### The Quality Gate
No raw AI reaches users. All content verified before delivery.

### The Hub & Spoke
Central brain (Hub) manages data. Specialized satellites serve users.

### Micro-Test Sampling
Generate Module 1 only. Validate demand. Generate full course if proven. Save 85%.

### Generational Interface
One knowledge base, many lenses. Adapt for Jonny (age 6), Scott (age 60+), Standard.

---

## 🚦 Status Indicators

Throughout the codebase and documentation:

- ✅ **Complete** - Fully implemented and operational
- ⏳ **In Progress** - Partially implemented, work ongoing
- 📋 **Planned** - Designed but not yet started
- 🚀 **Future** - Long-term vision, timeline TBD
- ❌ **Blocked** - Cannot proceed due to dependencies

---

## 📝 Commit Message Convention

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

**Examples:**
```
feat: Add bounty posting system
fix: Resolve YouTube transcript extraction error
docs: Update ARCHITECTURE.md with new database schema
refactor: Simplify learning-path-architect.js
```

---

## 🔄 Git Workflow

```bash
# Start new feature
git checkout -b feature/feature-name

# Make changes
git add .
git commit -m "feat: add feature-name"

# Push to remote
git push origin feature/feature-name

# Create PR on GitHub
# After approval, merge to main
```

---

## 📈 Success Metrics

### User Metrics
- Research requests submitted
- Upgrade rate (freemium → paid)
- Course completion rate

### Business Metrics
- Monthly recurring revenue (MRR)
- Customer acquisition cost (CAC)
- Lifetime value (LTV)

### Technical Metrics
- API response time < 200ms
- Database queries < 50ms
- Payment success rate > 98%
- Course generation success rate > 95%

---

**Need more details?** Check the full documentation files!

**Ready to build?** Start with Phase 1 in `IMPLEMENTATION_ROADMAP.md`!

---

*Quick Reference Version: 1.0*  
*Last Updated: November 30, 2025*
