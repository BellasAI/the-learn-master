# The Learn Master - Technical Architecture

**Document Version:** 1.0  
**Last Updated:** November 30, 2025  
**Status:** Hub Foundation Complete, Satellite A Active

---

## Overview

The Learn Master is built on a **Hub & Spoke Architecture** where a central "Hub" manages core logic and data, while specialized "Satellites" provide domain-specific user experiences. This architecture enables modular development, independent scaling, and cross-platform content reuse.

---

## Architecture Diagram

```
                    ┌─────────────────────┐
                    │                     │
                    │     THE HUB         │
                    │  (Central Brain)    │
                    │                     │
                    │  • Database         │
                    │  • Identity         │
                    │  • Content Logic    │
                    │  • Gap Detection    │
                    │  • Quality Gates    │
                    │                     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
    ┌─────────────────┐ ┌─────────────┐ ┌─────────────────┐
    │  Satellite A    │ │ Satellite B │ │  Satellite C    │
    │  (Web Learning) │ │ (AR/VR/Maps)│ │  (Marketplace)  │
    │                 │ │             │ │                 │
    │  ✅ ACTIVE      │ │  📋 PLANNED │ │  ⏳ FOUNDATION  │
    │  • React UI     │ │  • Mobile   │ │  • Bounty Posts │
    │  • Course View  │ │  • Unity    │ │  • Expert Queue │
    │  • Progress     │ │  • WebXR    │ │  • Payments     │
    │  • Research     │ │  • GPS      │ │  • Verification │
    └─────────────────┘ └─────────────┘ └─────────────────┘
```

---

## The Hub (Central Brain)

### Purpose
The Hub is the **single source of truth** for all platform data and business logic. It manages:
- User identity and authentication
- Content generation and storage
- Gap detection and tracking
- Quality verification
- Regulatory compliance
- Cross-platform data flow

### Current Implementation Status: 90% Complete ✅

#### ✅ Completed Components

**1. Content Generation Engine**
- **Location:** `src/lib/learning-path-architect.js`
- **Function:** Generates structured learning paths with 28-module framework
- **Features:**
  - Multi-source research aggregation
  - YouTube video curation with timestamps
  - Supplementary resource identification
  - Formal education pathway mapping

**2. Gap Detection System**
- **Location:** `src/lib/content-gaps-library.js`
- **Function:** Identifies missing content during generation
- **Features:**
  - Real-time gap identification
  - Gap categorization (missing sources, incomplete coverage)
  - Priority scoring for marketplace
  - Gap tracking for future filling

**3. Quality Verification**
- **Location:** `src/lib/quality-verification.js`
- **Function:** Validates content before delivery
- **Features:**
  - Source credibility checking
  - Content completeness validation
  - Hallucination prevention
  - Expert verification workflow

**4. Research Engine**
- **Location:** `src/lib/research-engine.js`, `src/lib/multi-source-research.js`
- **Function:** Aggregates learning resources from multiple sources
- **Features:**
  - YouTube API integration
  - Transcript extraction and analysis
  - Resource ranking by relevance
  - Source attribution

**5. Content Safety & Compliance**
- **Location:** `src/lib/content-safety.js`, `src/lib/formal-education.js`
- **Function:** Ensures regulatory compliance
- **Features:**
  - Regulated profession detection
  - "Theory Only" disclaimers
  - Training provider referral system (foundation)
  - Professional qualification tracking

#### ⏳ In Progress Components

**1. Referral Engine (70% Complete)**
- **Status:** Foundation built, integration pending
- **Location:** `src/lib/formal-education.js`
- **Remaining Work:**
  - Training provider API integration
  - Affiliate tracking system
  - Revenue commission tracking
  - Partner dashboard

**2. Database Persistence (Planned)**
- **Status:** Currently using localStorage (mock)
- **Required:** Backend API with PostgreSQL/MongoDB
- **Schema Needed:**
  - User accounts and subscriptions
  - Generated courses and modules
  - Content gaps and bounties
  - Expert submissions
  - Analytics and metrics

**3. Micro-Test Sampling Engine (Planned)**
- **Status:** Concept defined, not implemented
- **Purpose:** Generate Module 1 only, validate demand before full generation
- **Expected Savings:** 85% reduction in API costs
- **Implementation:** Requires backend + demand tracking

---

## Satellite A: Web Learning Platform

### Purpose
Primary user-facing platform for requesting, viewing, and consuming learning paths.

### Current Implementation Status: 40% Complete ⏳

#### ✅ Completed Features

**1. Landing Page**
- **Location:** `src/pages/LandingPage.jsx`
- **Features:**
  - Clear value proposition
  - Honest marketing (no fake features)
  - Tier comparison
  - Call-to-action for sign-up

**2. User Dashboard**
- **Location:** `src/pages/Dashboard.jsx`
- **Features:**
  - Request history
  - Tier usage tracking
  - Subscription status
  - Request limits enforcement

**3. Learning Path Request System**
- **Location:** `src/pages/RequestPath.jsx`
- **Features:**
  - Topic input form
  - Formal education toggle
  - Real-time generation
  - Progress indicators

**4. Learning Journey Viewer**
- **Location:** `src/pages/LearningJourney.jsx`, `src/components/CompleteLearningJourney.jsx`
- **Features:**
  - Structured module display
  - Video player with timestamps
  - Transcript viewing
  - Resource links with UTM tracking

**5. Stripe Integration (Frontend)**
- **Location:** `src/components/StripeCheckout.jsx`, `src/lib/stripe-config.js`
- **Status:** Frontend ready, backend pending
- **Features:**
  - Tier selection modal
  - Pricing display
  - Upgrade flow (demo mode)

#### ⏳ Planned Features

**1. Generational Interface (Jonny vs. Scott)**
- **Status:** Not implemented
- **Purpose:** Age-adaptive content delivery
- **Requirements:**
  - User profile with age/experience
  - Content simplification engine
  - Technical depth control
  - Visual vs. text preferences

**2. Progress Tracking**
- **Status:** Not implemented
- **Purpose:** Track module completion and learning progress
- **Requirements:**
  - Backend database
  - Progress API endpoints
  - UI for progress visualization
  - Achievement milestones

**3. Life CV (Skill Timeline)**
- **Status:** Not implemented
- **Purpose:** Lifelong skill tracking from age 6 to 96
- **Requirements:**
  - Skill taxonomy definition
  - Blockchain/NFT integration for verification
  - Employer API for skill verification
  - Privacy controls

**4. Audio Narration (Eleven Labs)**
- **Status:** Planned
- **Purpose:** Text-to-speech for all learning materials
- **Requirements:**
  - Eleven Labs API integration
  - Audio file storage (S3/CDN)
  - Audio player UI component
  - Transcript synchronization

**5. NotebookLM Integration**
- **Status:** Under consideration
- **Purpose:** Automated source citation and audio generation
- **Requirements:**
  - NotebookLM API access
  - Automated content export
  - Source attribution system
  - Audio file management

---

## Satellite B: AR/VR/Maps Platform

### Purpose
Immersive, location-based learning experiences that turn the world into a classroom.

### Current Implementation Status: 0% Planned 📋

#### Planned Features

**1. "Did You Know?" Engine**
- **Concept:** GPS-triggered historical facts and learning moments
- **Example:** "You are standing where William Wallace was executed. Want to see it in AR?"
- **Tech Stack:** React Native, WebXR, Geospatial database

**2. "Life Walk" VR Experiences**
- **Concept:** Interactive "Walk in their Shoes" historical simulations
- **Example:** "The Life of Queen Victoria"
- **Tech Stack:** Unity, WebXR, Google Maps 3D Tiles

**3. Museum Partnership Program**
- **Concept:** Location sponsorships and premium "Time Travel" tickets
- **Revenue:** £5-20 per experience
- **Partners:** Museums, heritage sites, educational institutions

#### Implementation Timeline
- **Phase 1 (Prototype):** 6-8 weeks after Satellite A completion
- **Phase 2 (Pilot):** Museum partnership pilot
- **Phase 3 (Scale):** Public launch with 10+ locations

---

## Satellite C: Gap Marketplace

### Purpose
Enable experts to fill content gaps identified during generation, creating a self-sustaining content flywheel.

### Current Implementation Status: 10% Foundation ⏳

#### ✅ Completed Components

**1. Gap Detection**
- **Location:** `src/lib/content-gaps-library.js`
- **Features:**
  - Automatic gap identification during generation
  - Gap categorization and priority scoring
  - Gap storage (currently localStorage)

#### ⏳ Planned Features

**1. Bounty Posting System**
- **Purpose:** Automatically post bounties for identified gaps
- **Example:** "Missing: Carburetor adjustment diagram for 1965 Ford - £20"
- **Requirements:**
  - Bounty database schema
  - Bounty listing UI
  - Automatic bounty creation from gaps

**2. Expert Bidding Interface**
- **Purpose:** Allow experts to claim and fulfill bounties
- **Features:**
  - Expert registration and profiles
  - Bidding/claiming system
  - Submission upload interface
  - Expert reputation scoring

**3. Payment Integration**
- **Purpose:** Process bounty payments and platform commissions
- **Tech:** Stripe Connect
- **Revenue Model:** 20% platform commission
- **Example:** £20 bounty = £16 to expert, £4 to platform

**4. Quality Verification Workflow**
- **Purpose:** Validate expert submissions before payment
- **Process:**
  1. Expert submits content
  2. Automated quality check
  3. Peer review (if needed)
  4. Approval/rejection
  5. Payment release
  6. Content added to library

#### Implementation Timeline
- **Phase 1 (Foundation):** 3-4 weeks after Satellite A completion
- **Phase 2 (MVP):** Basic bounty posting and expert submissions
- **Phase 3 (Scale):** Reputation system and automated payments

---

## The Flywheel: Cross-Platform Content Generation

### How It Works

**The Vision:**
> "Consumption in one place creates Production in another."

**Example Flow:**

1. **User Activity in Satellite B (AR)**
   - Scott points phone at statue in Edinburgh
   - AR app asks Hub: "Who made this?"
   - Hub responds: "I have the name, but zero bio for this sculptor"
   - **GAP DETECTED**

2. **The Hub Registers Gap**
   - Creates entry in `course_gaps` database
   - Priority: Medium
   - Bounty: £20
   - Topic: "Biography of Sculptor X"

3. **Satellite C (Marketplace) Posts Bounty**
   - Expert sees: "Wanted: Bio of Sculptor X - £20"
   - Expert researches and submits bio
   - Platform verifies quality
   - Expert receives £16 (platform keeps £4)

4. **Satellite A (Web) Serves Content**
   - Jonny searches "Scottish Sculptors" weeks later
   - Gets perfect, verified answer
   - Content generated by Scott's walk
   - **THE WHEEL TURNS**

### Current Status
- **Gap Detection:** ✅ Working in Satellite A
- **Gap Storage:** ⏳ localStorage (needs backend)
- **Marketplace:** 📋 Not implemented
- **Cross-platform flow:** 📋 Not implemented

---

## Data Flow Architecture

### Current Data Flow (Satellite A Only)

```
User Request
    ↓
Research Engine (YouTube, Web)
    ↓
Content Generation (learning-path-architect.js)
    ↓
Gap Detection (content-gaps-library.js)
    ↓
Quality Verification (quality-verification.js)
    ↓
Storage (localStorage - temporary)
    ↓
Display to User
```

### Target Data Flow (Full Hub & Spoke)

```
User Request (Any Satellite)
    ↓
Hub API
    ↓
Check Database: "Do we have this content?"
    ├─ YES → Return cached content (instant)
    └─ NO → Generate new content
        ↓
    Research Engine
        ↓
    Content Generation
        ↓
    Gap Detection → Post to Marketplace (Satellite C)
        ↓
    Quality Verification
        ↓
    Save to Database
        ↓
    Return to User
        ↓
    Track Usage Metrics
        ↓
    Update Demand Score
        ↓
    If high demand → Generate full course
```

---

## Technology Stack

### Current Stack (Satellite A)

**Frontend:**
- React 19.1.0
- Vite 6.3.5
- Tailwind CSS 4.1.7
- Radix UI components
- Lucide React icons

**State Management:**
- React hooks
- localStorage (temporary)

**Payment:**
- Stripe (frontend only)
- @stripe/stripe-js 8.1.0

**Routing:**
- React Router DOM 7.6.1

**PDF Generation:**
- jsPDF 3.0.3
- jspdf-autotable 5.0.2

### Required Stack (Full Platform)

**Backend:**
- Node.js + Express OR Python + FastAPI
- PostgreSQL (primary database)
- Redis (caching)
- Stripe Connect (marketplace payments)

**APIs:**
- YouTube Data API v3
- OpenAI/Gemini (content generation)
- Eleven Labs (text-to-speech)
- NotebookLM (optional, source citation)

**Infrastructure:**
- Vercel/Netlify (frontend hosting)
- Railway/AWS (backend hosting)
- S3/Cloudflare R2 (file storage)
- CloudFlare (CDN)

**Mobile (Satellite B):**
- React Native OR Unity
- WebXR
- Google Maps API
- Geospatial database (PostGIS)

---

## Database Schema (Planned)

### Core Tables

**users**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  tier VARCHAR(50) DEFAULT 'freemium',
  requests_used INTEGER DEFAULT 0,
  requests_limit INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**courses**
```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  topic TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'generating',
  module_count INTEGER DEFAULT 28,
  is_regulated BOOLEAN DEFAULT FALSE,
  governing_body TEXT,
  disclaimer TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**modules**
```sql
CREATE TABLE modules (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  module_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content JSONB,
  videos JSONB,
  resources JSONB,
  estimated_time INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**course_gaps**
```sql
CREATE TABLE course_gaps (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  gap_type VARCHAR(100),
  description TEXT,
  priority VARCHAR(50),
  bounty_amount DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW()
);
```

**course_demand_metrics**
```sql
CREATE TABLE course_demand_metrics (
  id SERIAL PRIMARY KEY,
  course_id INTEGER REFERENCES courses(id),
  topic TEXT,
  module_1_starts INTEGER DEFAULT 0,
  module_1_completions INTEGER DEFAULT 0,
  module_2_clicks INTEGER DEFAULT 0,
  avg_time_spent_seconds INTEGER,
  completion_rate REAL,
  demand_score REAL,
  status VARCHAR(50) DEFAULT 'sampling',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**bounties**
```sql
CREATE TABLE bounties (
  id SERIAL PRIMARY KEY,
  gap_id INTEGER REFERENCES course_gaps(id),
  title TEXT NOT NULL,
  description TEXT,
  bounty_amount DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'open',
  expert_id INTEGER REFERENCES users(id),
  submission_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

**expert_profiles**
```sql
CREATE TABLE expert_profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  expertise_areas TEXT[],
  reputation_score REAL DEFAULT 0,
  bounties_completed INTEGER DEFAULT 0,
  total_earned DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Revenue Model

### Stream A: Subscriptions

**Tiers:**
| Tier | Price | Requests/Month | Features |
|------|-------|----------------|----------|
| Freemium | Free | 1 | 3 video previews, basic resources |
| Starter | $10/mo | 2 | Full videos (15-25), timestamps, resources |
| Advanced | $25/mo | 5 | In-depth research (30-40 resources), priority |
| Scholar | $50/mo | 10 | Premium access, early features, priority |

**Implementation Status:** ✅ Frontend ready, backend pending

### Stream B: Gap Marketplace

**Model:** 20% commission on all bounties
- Expert earns: 80% of bounty
- Platform earns: 20% of bounty
- Example: £20 bounty = £16 expert, £4 platform

**Implementation Status:** 10% foundation (gap detection only)

### Stream C: Referral Engine

**Model:** Lead generation fees for training providers
- Gas Safe training: £50-200 per lead
- Electrical training: £30-150 per lead
- Professional certifications: £40-180 per lead

**Implementation Status:** 70% foundation (detection ready, referral links pending)

### Stream D: Market Research Data

**Model:** Sell demand analytics to training providers, publishers, colleges
- Training Providers: £5,000-20,000/year
- Publishers: £10,000-50,000/year
- Colleges: £15,000-100,000/year
- Awarding Bodies: £50,000-500,000/year

**Implementation Status:** 0% (requires demand tracking system)

---

## Implementation Roadmap

### Phase 1: Complete The Hub (2-3 weeks) 🎯

**Priority: HIGH**

1. ✅ Database save logic (COMPLETE)
2. ✅ Gap detection (COMPLETE)
3. ⏳ Build backend API (Node.js/Express or Python/FastAPI)
4. ⏳ Implement PostgreSQL database
5. ⏳ Migrate from localStorage to database
6. ⏳ Add user authentication (JWT)
7. ⏳ Complete referral engine
8. ⏳ Add regulatory disclaimer system

### Phase 2: Complete Satellite A (3-4 weeks) 🌐

**Priority: HIGH**

1. ⏳ Backend integration for all features
2. ⏳ Real Stripe payment processing
3. ⏳ Progress tracking system
4. ⏳ Course catalog (from database)
5. ⏳ Generational interface (Jonny vs. Scott) foundation
6. ⏳ Audio narration (Eleven Labs integration)
7. ⏳ Email notifications
8. ⏳ Analytics dashboard

### Phase 3: Launch Satellite C (4-6 weeks) 💰

**Priority: MEDIUM**

1. ⏳ Bounty posting system
2. ⏳ Expert registration and profiles
3. ⏳ Bidding/claiming interface
4. ⏳ Submission upload system
5. ⏳ Payment integration (Stripe Connect)
6. ⏳ Quality verification workflow
7. ⏳ Expert reputation system
8. ⏳ Admin dashboard for bounty management

### Phase 4: Implement Micro-Test Sampling (2-3 weeks) 📊

**Priority: MEDIUM**

1. ⏳ Modify generation to create Module 1 only
2. ⏳ Add demand tracking system
3. ⏳ Implement demand score calculation
4. ⏳ Auto-trigger full generation at threshold
5. ⏳ User notification system
6. ⏳ Analytics dashboard for demand metrics

### Phase 5: Prototype Satellite B (8-12 weeks) 🌍

**Priority: LOW**

1. 📋 Mobile app development (React Native)
2. 📋 Geospatial database integration
3. 📋 AR content viewer (Unity/WebXR)
4. 📋 "Did You Know?" engine
5. 📋 Location-based triggers
6. 📋 Museum partnership pilot

---

## Security & Compliance

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

## Competitive Moat

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

## Key Files Reference

### Core Libraries

| File | Purpose | Status |
|------|---------|--------|
| `src/lib/learning-path-architect.js` | Course structure generation | ✅ Complete |
| `src/lib/content-gaps-library.js` | Gap detection system | ✅ Complete |
| `src/lib/multi-source-research.js` | Research aggregation | ✅ Complete |
| `src/lib/quality-verification.js` | Content validation | ✅ Complete |
| `src/lib/research-engine.js` | YouTube + web research | ✅ Complete |
| `src/lib/formal-education.js` | Training provider integration | ⏳ 70% |
| `src/lib/content-safety.js` | Regulatory compliance | ✅ Complete |
| `src/lib/youtube-transcript.js` | Transcript extraction | ✅ Complete |
| `src/lib/transcript-ai-analysis.js` | AI-powered analysis | ✅ Complete |

### Components

| File | Purpose | Status |
|------|---------|--------|
| `src/components/CompleteLearningJourney.jsx` | Main learning path viewer | ✅ Complete |
| `src/components/VideoPlayerWithTranscript.jsx` | Video player with timestamps | ✅ Complete |
| `src/components/StripeCheckout.jsx` | Payment integration | ⏳ Frontend only |
| `src/components/DisclaimerModal.jsx` | Regulatory disclaimers | ✅ Complete |

### Pages

| File | Purpose | Status |
|------|---------|--------|
| `src/pages/LandingPage.jsx` | Homepage | ✅ Complete |
| `src/pages/Dashboard.jsx` | User dashboard | ✅ Complete |
| `src/pages/RequestPath.jsx` | Learning path request | ✅ Complete |
| `src/pages/LearningJourney.jsx` | Course viewer | ✅ Complete |
| `src/pages/Profile.jsx` | User profile & subscription | ✅ Complete |
| `src/pages/CourseCatalog.jsx` | Course library | ⏳ "Coming Soon" |

---

## Next Steps

### Immediate Priorities (This Week)

1. **Build Backend API**
   - Set up Express/FastAPI server
   - Create PostgreSQL database
   - Implement authentication endpoints
   - Add course CRUD endpoints

2. **Migrate from localStorage**
   - Connect frontend to backend API
   - Migrate user data to database
   - Implement proper session management

3. **Complete Stripe Integration**
   - Set up Stripe account
   - Add webhook handlers
   - Test payment flow end-to-end

### Short-Term Goals (This Month)

1. **Launch MVP with Backend**
   - Deploy backend to Railway/AWS
   - Deploy frontend to Vercel
   - Set up production database
   - Enable real payments

2. **Implement Micro-Test Sampling**
   - Reduce API costs by 85%
   - Validate demand before full generation
   - Build analytics dashboard

3. **Complete Referral Engine**
   - Integrate training provider APIs
   - Add affiliate tracking
   - Test lead generation flow

### Long-Term Vision (Next 6 Months)

1. **Launch Satellite C (Marketplace)**
2. **Implement Generational Interface**
3. **Add Audio Narration (Eleven Labs)**
4. **Prototype Satellite B (AR/VR)**
5. **Build Life CV Foundation**
6. **Scale to 10,000+ courses**

---

**For detailed strategic vision, see:** `MASTER_STRATEGIC_PLAN.md`  
**For current platform status, see:** `README.md`  
**For deployment instructions, see:** `DEPLOY.md`

---

*Document maintained by: The Learn Master Team*  
*Architecture Version: 1.0*  
*Last Review: November 30, 2025*
