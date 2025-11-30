# The Learn Master - Implementation Roadmap

**Document Version:** 1.0  
**Last Updated:** November 30, 2025  
**Current Status:** Hub Foundation 90% Complete, Satellite A 40% Complete

---

## Executive Summary

This roadmap outlines the step-by-step implementation plan to transform The Learn Master from a frontend prototype into a fully operational Hub & Spoke platform with three satellites, marketplace functionality, and self-sustaining content generation.

**Timeline:** 6-8 months to full platform launch  
**Current Phase:** Phase 1 - Complete The Hub  
**Next Milestone:** Backend API + Database Integration

---

## Phase 1: Complete The Hub (Weeks 1-3) 🎯

**Goal:** Build the central brain with database, API, and core business logic.

**Status:** 90% → 100%  
**Priority:** CRITICAL  
**Estimated Time:** 2-3 weeks  
**Blockers:** None

### Week 1: Backend Foundation

#### Task 1.1: Set Up Backend Infrastructure
- [ ] Choose backend framework (Node.js + Express OR Python + FastAPI)
- [ ] Initialize backend project structure
- [ ] Set up PostgreSQL database (local + production)
- [ ] Configure environment variables
- [ ] Set up Redis for caching (optional, recommended)
- [ ] Create database connection utilities

**Deliverables:**
- Backend server running on localhost
- Database connection established
- Health check endpoint working

**Estimated Time:** 2-3 days

---

#### Task 1.2: Database Schema Implementation
- [ ] Create `users` table with authentication fields
- [ ] Create `courses` table with all metadata
- [ ] Create `modules` table with JSONB content storage
- [ ] Create `course_gaps` table for marketplace
- [ ] Create `course_demand_metrics` table for sampling
- [ ] Create `bounties` table for marketplace
- [ ] Create `expert_profiles` table
- [ ] Create `subscriptions` table for Stripe integration
- [ ] Add indexes for performance
- [ ] Create database migration scripts

**SQL Schema Reference:** See `ARCHITECTURE.md` for complete schema

**Deliverables:**
- All tables created with proper relationships
- Migration scripts ready
- Seed data for testing

**Estimated Time:** 2-3 days

---

#### Task 1.3: Authentication System
- [ ] Implement user registration endpoint (`POST /api/auth/register`)
- [ ] Implement user login endpoint (`POST /api/auth/login`)
- [ ] Add JWT token generation and validation
- [ ] Add refresh token mechanism
- [ ] Implement password hashing (bcrypt)
- [ ] Add middleware for protected routes
- [ ] Create logout endpoint
- [ ] Add email verification (optional for MVP)

**API Endpoints:**
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

**Deliverables:**
- Working authentication flow
- JWT tokens issued and validated
- Protected routes enforced

**Estimated Time:** 2-3 days

---

### Week 2: Core API Endpoints

#### Task 2.1: User Management API
- [ ] Get user profile (`GET /api/users/me`)
- [ ] Update user profile (`PUT /api/users/me`)
- [ ] Get subscription status (`GET /api/users/subscription`)
- [ ] Get usage statistics (`GET /api/users/usage`)
- [ ] Reset password endpoint (`POST /api/users/reset-password`)

**Deliverables:**
- User CRUD operations working
- Profile updates persisted to database

**Estimated Time:** 1 day

---

#### Task 2.2: Course Management API
- [ ] Create course request (`POST /api/courses`)
- [ ] Get user's courses (`GET /api/courses`)
- [ ] Get single course by ID (`GET /api/courses/:id`)
- [ ] Get course modules (`GET /api/courses/:id/modules`)
- [ ] Get single module (`GET /api/courses/:id/modules/:moduleId`)
- [ ] Update course status (`PATCH /api/courses/:id/status`)
- [ ] Delete course (`DELETE /api/courses/:id`)

**Deliverables:**
- Course CRUD operations working
- Courses stored in database
- Modules retrievable by ID

**Estimated Time:** 2 days

---

#### Task 2.3: Content Generation Integration
- [ ] Move `learning-path-architect.js` logic to backend
- [ ] Create background job queue (Bull/BullMQ or Celery)
- [ ] Implement async course generation
- [ ] Add webhook for generation completion
- [ ] Store generated content in database
- [ ] Add error handling and retry logic
- [ ] Implement generation status tracking

**API Endpoints:**
```
POST   /api/courses/generate
GET    /api/courses/:id/status
POST   /api/webhooks/generation-complete
```

**Deliverables:**
- Course generation runs in background
- User notified when complete
- Content saved to database

**Estimated Time:** 2-3 days

---

### Week 3: Gap Detection & Quality Gates

#### Task 3.1: Gap Detection System
- [ ] Move `content-gaps-library.js` logic to backend
- [ ] Integrate gap detection into generation pipeline
- [ ] Store gaps in `course_gaps` table
- [ ] Add gap priority scoring
- [ ] Create API endpoints for gaps

**API Endpoints:**
```
GET    /api/gaps
GET    /api/courses/:id/gaps
POST   /api/gaps/:id/resolve
```

**Deliverables:**
- Gaps automatically detected during generation
- Gaps stored in database with priority scores
- Gaps retrievable via API

**Estimated Time:** 2 days

---

#### Task 3.2: Quality Verification System
- [ ] Move `quality-verification.js` logic to backend
- [ ] Add quality checks before saving to database
- [ ] Implement expert verification workflow
- [ ] Add quality scoring for content
- [ ] Create admin dashboard for manual review

**Deliverables:**
- Quality gate prevents bad content from reaching users
- Admin can review flagged content
- Quality scores tracked

**Estimated Time:** 2 days

---

#### Task 3.3: Regulatory Compliance System
- [ ] Move `content-safety.js` logic to backend
- [ ] Detect regulated professions automatically
- [ ] Add "Theory Only" disclaimers to regulated courses
- [ ] Store governing body information
- [ ] Create API for training provider referrals

**Deliverables:**
- Regulated courses flagged automatically
- Disclaimers displayed to users
- Training provider links ready

**Estimated Time:** 1 day

---

### Phase 1 Success Criteria

- [x] Backend API running in production
- [x] Database with all tables created
- [x] Authentication working (JWT)
- [x] Course generation working end-to-end
- [x] Content saved to database
- [x] Gap detection operational
- [x] Quality gates enforced
- [x] Regulatory compliance active

---

## Phase 2: Complete Satellite A (Weeks 4-7) 🌐

**Goal:** Integrate frontend with backend, add missing features, launch MVP.

**Status:** 40% → 100%  
**Priority:** HIGH  
**Estimated Time:** 3-4 weeks  
**Blockers:** Requires Phase 1 completion

### Week 4: Frontend-Backend Integration

#### Task 4.1: API Client Setup
- [ ] Create API client utility (`src/lib/api-client.js`)
- [ ] Add Axios or Fetch wrapper
- [ ] Implement token storage and refresh
- [ ] Add error handling and retry logic
- [ ] Create API hooks for React components

**Deliverables:**
- Centralized API client
- Automatic token refresh
- Error handling across app

**Estimated Time:** 1 day

---

#### Task 4.2: Authentication Integration
- [ ] Replace mock auth with real API calls
- [ ] Update login page to use backend
- [ ] Update registration page to use backend
- [ ] Add protected route logic
- [ ] Implement logout functionality
- [ ] Remove localStorage auth (use JWT)

**Deliverables:**
- Real authentication working
- Users stored in database
- Sessions managed properly

**Estimated Time:** 2 days

---

#### Task 4.3: Dashboard Integration
- [ ] Fetch user data from API
- [ ] Fetch courses from API
- [ ] Display real usage statistics
- [ ] Update tier limits from database
- [ ] Add loading states
- [ ] Add error states

**Deliverables:**
- Dashboard shows real data
- No more mock data
- Loading and error states handled

**Estimated Time:** 2 days

---

### Week 5: Stripe Payment Integration

#### Task 5.1: Stripe Backend Setup
- [ ] Create Stripe account
- [ ] Set up Stripe products (Starter, Advanced, Scholar)
- [ ] Get Stripe API keys (test + live)
- [ ] Install Stripe SDK on backend
- [ ] Create checkout session endpoint (`POST /api/stripe/create-checkout`)
- [ ] Create customer portal endpoint (`POST /api/stripe/create-portal`)
- [ ] Add webhook endpoint (`POST /api/webhooks/stripe`)

**Deliverables:**
- Stripe account configured
- Products created
- Backend endpoints ready

**Estimated Time:** 2 days

---

#### Task 5.2: Stripe Webhook Handlers
- [ ] Handle `checkout.session.completed` event
- [ ] Handle `customer.subscription.created` event
- [ ] Handle `customer.subscription.updated` event
- [ ] Handle `customer.subscription.deleted` event
- [ ] Update user tier in database
- [ ] Send confirmation emails
- [ ] Add webhook signature verification

**Deliverables:**
- Webhooks working
- User tier updated automatically
- Email confirmations sent

**Estimated Time:** 2 days

---

#### Task 5.3: Frontend Stripe Integration
- [ ] Update `StripeCheckout.jsx` to use real API
- [ ] Remove demo mode alert
- [ ] Add checkout redirect
- [ ] Add customer portal link in Profile page
- [ ] Add subscription status display
- [ ] Add upgrade/downgrade flow
- [ ] Test payment flow end-to-end

**Deliverables:**
- Real payments working
- Users can upgrade/downgrade
- Subscription status accurate

**Estimated Time:** 1 day

---

### Week 6: Progress Tracking & Course Catalog

#### Task 6.1: Progress Tracking System
- [ ] Create `user_progress` table in database
- [ ] Add API endpoints for progress tracking
- [ ] Update frontend to track module completion
- [ ] Add progress bar to course viewer
- [ ] Add "Resume Learning" feature to dashboard
- [ ] Track time spent per module
- [ ] Add completion certificates (optional)

**API Endpoints:**
```
POST   /api/progress/module-start
POST   /api/progress/module-complete
GET    /api/progress/course/:id
GET    /api/progress/stats
```

**Deliverables:**
- Progress tracked per module
- Dashboard shows completion percentage
- Users can resume where they left off

**Estimated Time:** 2-3 days

---

#### Task 6.2: Course Catalog
- [ ] Update `CourseCatalog.jsx` to fetch from database
- [ ] Add search functionality
- [ ] Add filtering by category
- [ ] Add sorting options
- [ ] Display course metadata (modules, time, difficulty)
- [ ] Add "Start Course" button
- [ ] Add course preview

**Deliverables:**
- Course catalog shows real courses
- Users can browse and search
- Courses clickable and startable

**Estimated Time:** 2 days

---

### Week 7: Notifications & Polish

#### Task 7.1: Email Notifications
- [ ] Set up email service (SendGrid, Mailgun, or AWS SES)
- [ ] Create email templates
- [ ] Send welcome email on registration
- [ ] Send course completion email
- [ ] Send payment confirmation email
- [ ] Send course generation notification
- [ ] Add email preferences to user profile

**Deliverables:**
- Transactional emails working
- Users notified of key events
- Email preferences configurable

**Estimated Time:** 2 days

---

#### Task 7.2: Analytics & Monitoring
- [ ] Add Google Analytics or Plausible
- [ ] Track key user actions (sign up, request, payment)
- [ ] Add error logging (Sentry or LogRocket)
- [ ] Create admin analytics dashboard
- [ ] Track conversion funnel
- [ ] Monitor API performance

**Deliverables:**
- Analytics tracking key metrics
- Errors logged and monitored
- Admin dashboard for insights

**Estimated Time:** 1 day

---

#### Task 7.3: UI/UX Polish
- [ ] Add loading skeletons
- [ ] Improve error messages
- [ ] Add success notifications (toast)
- [ ] Improve mobile responsiveness
- [ ] Add keyboard shortcuts
- [ ] Improve accessibility (ARIA labels)
- [ ] Add dark mode (optional)

**Deliverables:**
- Professional, polished UI
- Better user experience
- Accessible to all users

**Estimated Time:** 2 days

---

### Phase 2 Success Criteria

- [x] Frontend connected to backend
- [x] Real authentication working
- [x] Stripe payments processing
- [x] Progress tracking operational
- [x] Course catalog populated
- [x] Email notifications sent
- [x] Analytics tracking
- [x] Production-ready MVP

---

## Phase 3: Launch Satellite C - Marketplace (Weeks 8-13) 💰

**Goal:** Enable experts to fill content gaps, creating revenue stream B.

**Status:** 10% → 100%  
**Priority:** MEDIUM  
**Estimated Time:** 4-6 weeks  
**Blockers:** Requires Phase 2 completion

### Week 8-9: Bounty System

#### Task 8.1: Bounty Database & API
- [ ] Create `bounties` table (already in schema)
- [ ] Create `expert_profiles` table
- [ ] Add API endpoints for bounties
- [ ] Implement automatic bounty creation from gaps
- [ ] Add bounty status workflow (open → claimed → submitted → approved → paid)

**API Endpoints:**
```
GET    /api/bounties
GET    /api/bounties/:id
POST   /api/bounties/:id/claim
POST   /api/bounties/:id/submit
PATCH  /api/bounties/:id/approve
PATCH  /api/bounties/:id/reject
```

**Deliverables:**
- Bounties created automatically from gaps
- API endpoints working
- Status workflow implemented

**Estimated Time:** 3-4 days

---

#### Task 8.2: Expert Registration & Profiles
- [ ] Create expert registration flow
- [ ] Add expertise area selection
- [ ] Create expert profile page
- [ ] Add portfolio/credentials upload
- [ ] Implement reputation scoring system
- [ ] Add expert verification process

**Deliverables:**
- Experts can register
- Profiles display expertise and reputation
- Verification process in place

**Estimated Time:** 3-4 days

---

### Week 10-11: Marketplace UI

#### Task 10.1: Bounty Listing Page
- [ ] Create `MarketplacePage.jsx`
- [ ] Display all open bounties
- [ ] Add filtering by category, bounty amount
- [ ] Add sorting by priority, date, amount
- [ ] Add search functionality
- [ ] Display bounty details (description, requirements, deadline)

**Deliverables:**
- Marketplace page showing bounties
- Experts can browse and search
- Bounty details clear

**Estimated Time:** 2-3 days

---

#### Task 10.2: Bounty Claim & Submission Flow
- [ ] Add "Claim Bounty" button
- [ ] Create submission form
- [ ] Add file upload for submissions
- [ ] Add text editor for written content
- [ ] Add preview before submission
- [ ] Add submission confirmation

**Deliverables:**
- Experts can claim bounties
- Experts can submit content
- Submissions stored in database

**Estimated Time:** 2-3 days

---

#### Task 10.3: Expert Dashboard
- [ ] Create `ExpertDashboard.jsx`
- [ ] Display claimed bounties
- [ ] Display submission status
- [ ] Display earnings (pending, paid)
- [ ] Display reputation score
- [ ] Add notification system for bounty updates

**Deliverables:**
- Experts have dedicated dashboard
- Earnings tracked
- Reputation visible

**Estimated Time:** 2 days

---

### Week 12-13: Payment Integration & Quality Control

#### Task 12.1: Stripe Connect Integration
- [ ] Set up Stripe Connect
- [ ] Create onboarding flow for experts
- [ ] Add payout endpoints
- [ ] Implement 80/20 split (expert/platform)
- [ ] Handle payout failures
- [ ] Add payout history

**Deliverables:**
- Experts can receive payments
- Platform takes 20% commission
- Payouts automated

**Estimated Time:** 3-4 days

---

#### Task 12.2: Quality Verification Workflow
- [ ] Create admin review interface
- [ ] Add automated quality checks
- [ ] Implement peer review system (optional)
- [ ] Add approval/rejection flow
- [ ] Send notifications on approval/rejection
- [ ] Add resubmission option

**Deliverables:**
- Submissions reviewed before payment
- Quality maintained
- Experts notified of decisions

**Estimated Time:** 2-3 days

---

#### Task 12.3: Content Integration
- [ ] Add approved content to course library
- [ ] Update course modules with filled gaps
- [ ] Mark gaps as "resolved"
- [ ] Notify users of new content
- [ ] Add "Expert Contributed" badge

**Deliverables:**
- Filled gaps integrated into courses
- Users see improved content
- Experts credited

**Estimated Time:** 2 days

---

### Phase 3 Success Criteria

- [x] Bounties posted automatically from gaps
- [x] Experts can register and create profiles
- [x] Experts can claim and submit bounties
- [x] Payments processed via Stripe Connect
- [x] Quality verification enforced
- [x] Content integrated into courses
- [x] Revenue stream B operational

---

## Phase 4: Micro-Test Sampling Engine (Weeks 14-16) 📊

**Goal:** Reduce API costs by 85% and validate demand before full generation.

**Status:** 0% → 100%  
**Priority:** MEDIUM  
**Estimated Time:** 2-3 weeks  
**Blockers:** Requires Phase 2 completion

### Week 14: Sampling Logic

#### Task 14.1: Modify Generation Logic
- [ ] Update generation to support `module_count` parameter
- [ ] Create "Module 1 only" generation mode
- [ ] Generate course outline (28 modules) without full content
- [ ] Store outline in database
- [ ] Add "sampling" status to courses

**Deliverables:**
- Generation can create Module 1 only
- Course outline generated
- Sampling mode operational

**Estimated Time:** 2-3 days

---

#### Task 14.2: Demand Tracking System
- [ ] Create `course_demand_metrics` table (already in schema)
- [ ] Track Module 1 starts
- [ ] Track Module 1 completions
- [ ] Track Module 2 clicks
- [ ] Track time spent
- [ ] Calculate demand score

**Formula:**
```javascript
demandScore = (
  (module_1_completions / module_1_starts) * 0.6 +
  (module_2_clicks / module_1_completions) * 0.4
) * 100
```

**Deliverables:**
- Demand metrics tracked
- Demand score calculated
- Metrics stored in database

**Estimated Time:** 2 days

---

### Week 15: Auto-Trigger & UI

#### Task 15.1: Auto-Trigger Full Generation
- [ ] Create background job to check demand scores
- [ ] Trigger full generation when score > 60 and clicks > 10
- [ ] Archive low-demand courses (score < 20, starts < 5)
- [ ] Send notification when full course generated
- [ ] Update course status to "complete"

**Deliverables:**
- Full courses generated automatically
- Low-demand courses archived
- Users notified

**Estimated Time:** 2 days

---

#### Task 15.2: Update UI for Sampling
- [ ] Show "Module 1 Available Now" badge
- [ ] Show locked modules (2-28)
- [ ] Add "Unlock Full Course" message
- [ ] Display progress bar to unlock
- [ ] Show notification when unlocked

**UI Example:**
```
✅ Module 1: Introduction (Available Now!)
🔒 Module 2: Basics (Unlocks at 60% demand)
🔒 Module 3: Advanced (Unlocks at 60% demand)
...
📊 Complete Module 1 to unlock the full course
```

**Deliverables:**
- UI clearly shows sampling status
- Users understand unlock mechanism
- Smooth unlock experience

**Estimated Time:** 2 days

---

### Week 16: Analytics Dashboard

#### Task 16.1: Demand Analytics Dashboard
- [ ] Create admin dashboard for demand metrics
- [ ] Display demand scores for all courses
- [ ] Show trending topics
- [ ] Add filtering and sorting
- [ ] Export data to CSV
- [ ] Add charts and visualizations

**Metrics to Display:**
- Topic
- Module 1 starts
- Module 1 completions
- Module 2 clicks
- Demand score
- Status (sampling, generating, complete, archived)
- Action (generate, watch, archive)

**Deliverables:**
- Admin can see demand metrics
- Data exportable for partners
- Insights actionable

**Estimated Time:** 3-4 days

---

### Phase 4 Success Criteria

- [x] Module 1 generated first for new topics
- [x] Demand tracked automatically
- [x] Full course generated when demand proven
- [x] Low-demand courses archived
- [x] 85% cost savings achieved
- [x] Analytics dashboard operational

---

## Phase 5: Generational Interface (Weeks 17-20) 👶👴

**Goal:** Adapt content delivery for different ages and experience levels.

**Status:** 0% → 100%  
**Priority:** LOW  
**Estimated Time:** 3-4 weeks  
**Blockers:** Requires Phase 2 completion

### Week 17-18: User Profiles & Adaptation Engine

#### Task 17.1: User Profile Enhancement
- [ ] Add age field to user profile
- [ ] Add experience level field (beginner, intermediate, advanced)
- [ ] Add learning style preference (visual, text, audio)
- [ ] Add reading level preference
- [ ] Create profile setup wizard

**Deliverables:**
- User profiles capture age and preferences
- Onboarding wizard guides setup

**Estimated Time:** 2 days

---

#### Task 17.2: Content Adaptation Engine
- [ ] Create content simplification algorithm
- [ ] Add technical depth control
- [ ] Implement language complexity adjustment
- [ ] Add visual vs. text preference logic
- [ ] Create "Jonny Mode" (age 6-12)
- [ ] Create "Scott Mode" (age 60+)
- [ ] Create "Standard Mode" (age 13-59)

**Adaptation Rules:**
- **Jonny Mode:** Simple language, visual metaphors, wonder-focused
- **Scott Mode:** Detailed, safety-focused, paced, respectful
- **Standard Mode:** Balanced, comprehensive, efficient

**Deliverables:**
- Content adapted based on user profile
- Three distinct modes operational
- Smooth mode switching

**Estimated Time:** 4-5 days

---

### Week 19-20: UI Implementation & Testing

#### Task 19.1: Adaptive UI Components
- [ ] Update course viewer to show adapted content
- [ ] Add mode switcher in settings
- [ ] Add preview of different modes
- [ ] Update module content rendering
- [ ] Add age-appropriate imagery

**Deliverables:**
- UI adapts to user mode
- Users can switch modes
- Content displays appropriately

**Estimated Time:** 3 days

---

#### Task 19.2: Testing & Refinement
- [ ] Test with different age groups
- [ ] Gather feedback on adaptations
- [ ] Refine simplification algorithms
- [ ] Test accessibility
- [ ] A/B test different approaches

**Deliverables:**
- Modes tested with real users
- Feedback incorporated
- High satisfaction across age groups

**Estimated Time:** 3-4 days

---

### Phase 5 Success Criteria

- [x] User profiles capture age and preferences
- [x] Content adapts to user profile
- [x] Three modes operational (Jonny, Scott, Standard)
- [x] UI reflects chosen mode
- [x] High user satisfaction

---

## Phase 6: Audio Narration (Weeks 21-23) 🎧

**Goal:** Add text-to-speech narration for all learning materials.

**Status:** 0% → 100%  
**Priority:** MEDIUM  
**Estimated Time:** 2-3 weeks  
**Blockers:** Requires Phase 2 completion

### Week 21: Eleven Labs Integration

#### Task 21.1: Eleven Labs Setup
- [ ] Create Eleven Labs account
- [ ] Get API keys
- [ ] Choose voices for different modes
- [ ] Test voice quality
- [ ] Set up audio file storage (S3/R2)

**Deliverables:**
- Eleven Labs account configured
- Voices selected
- Storage ready

**Estimated Time:** 1 day

---

#### Task 21.2: Audio Generation Pipeline
- [ ] Create audio generation endpoint (`POST /api/audio/generate`)
- [ ] Integrate Eleven Labs API
- [ ] Generate audio for module content
- [ ] Store audio files in S3/R2
- [ ] Add audio URLs to database
- [ ] Create background job for batch generation

**Deliverables:**
- Audio generated for all modules
- Files stored in cloud
- URLs accessible

**Estimated Time:** 3-4 days

---

### Week 22-23: Audio Player UI

#### Task 22.1: Audio Player Component
- [ ] Create `AudioPlayer.jsx` component
- [ ] Add play/pause controls
- [ ] Add progress bar
- [ ] Add speed control (0.5x, 1x, 1.5x, 2x)
- [ ] Add skip forward/backward (10s)
- [ ] Sync audio with text highlighting

**Deliverables:**
- Audio player functional
- Controls intuitive
- Text synced with audio

**Estimated Time:** 3 days

---

#### Task 22.2: Audio Integration
- [ ] Add audio player to course viewer
- [ ] Add "Listen" button to modules
- [ ] Add audio-only mode
- [ ] Add download option
- [ ] Track audio usage analytics

**Deliverables:**
- Audio available for all modules
- Users can listen while reading
- Audio-only mode available

**Estimated Time:** 2 days

---

### Phase 6 Success Criteria

- [x] Eleven Labs integrated
- [x] Audio generated for all modules
- [x] Audio player functional
- [x] Text synced with audio
- [x] Audio-only mode available

---

## Phase 7: Prototype Satellite B - AR/VR (Weeks 24-36) 🌍

**Goal:** Build immersive, location-based learning experiences.

**Status:** 0% → Prototype  
**Priority:** LOW  
**Estimated Time:** 8-12 weeks  
**Blockers:** Requires Phase 2 completion + content library

### Week 24-26: Mobile App Foundation

#### Task 24.1: Choose Tech Stack
- [ ] Decide: React Native OR Unity
- [ ] Set up development environment
- [ ] Create mobile app project
- [ ] Configure iOS and Android builds
- [ ] Set up app store accounts

**Recommendation:** React Native for faster development, Unity for better AR

**Deliverables:**
- Mobile app project initialized
- Development environment ready

**Estimated Time:** 2-3 days

---

#### Task 24.2: Basic App Structure
- [ ] Create navigation structure
- [ ] Add authentication screens
- [ ] Connect to Hub API
- [ ] Add map view (Google Maps or Mapbox)
- [ ] Test on iOS and Android devices

**Deliverables:**
- Basic app functional
- Users can log in
- Map displays

**Estimated Time:** 1 week

---

### Week 27-30: Geospatial Features

#### Task 27.1: Geospatial Database
- [ ] Set up PostGIS extension on PostgreSQL
- [ ] Create `locations` table with coordinates
- [ ] Add historical events to database
- [ ] Add points of interest
- [ ] Import initial dataset (Edinburgh, London, etc.)

**Deliverables:**
- Geospatial database operational
- Initial locations loaded

**Estimated Time:** 3-4 days

---

#### Task 27.2: "Did You Know?" Engine
- [ ] Track user GPS location
- [ ] Query nearby locations from database
- [ ] Trigger push notification when near POI
- [ ] Display historical fact
- [ ] Add "Learn More" button to full course

**Example:**
> "You are standing where William Wallace was executed. Want to see it in AR?"

**Deliverables:**
- Location tracking working
- Notifications triggered
- Facts displayed

**Estimated Time:** 1 week

---

### Week 31-34: AR Content Viewer

#### Task 31.1: AR Integration
- [ ] Choose AR framework (ARKit, ARCore, or WebXR)
- [ ] Set up AR session
- [ ] Add 3D model loading
- [ ] Add image recognition (optional)
- [ ] Test AR on devices

**Deliverables:**
- AR session working
- 3D models displayable

**Estimated Time:** 1 week

---

#### Task 31.2: Historical AR Experiences
- [ ] Create 3D models for key locations
- [ ] Add animations and interactions
- [ ] Add audio narration
- [ ] Add "Time Travel" mode
- [ ] Test user experience

**Deliverables:**
- AR experiences functional
- Users can interact with history

**Estimated Time:** 2 weeks

---

### Week 35-36: Museum Partnership Pilot

#### Task 35.1: Partner Integration
- [ ] Reach out to 5-10 museums
- [ ] Create partnership proposal
- [ ] Negotiate revenue share
- [ ] Add museum locations to database
- [ ] Create custom AR experiences for partners

**Deliverables:**
- 2-3 museum partnerships secured
- Custom experiences created

**Estimated Time:** 2 weeks

---

### Phase 7 Success Criteria

- [x] Mobile app functional on iOS and Android
- [x] Geospatial database operational
- [x] "Did You Know?" engine working
- [x] AR experiences functional
- [x] 2-3 museum partnerships secured
- [x] Prototype ready for beta testing

---

## Success Metrics

### Phase 1 Metrics
- [x] Backend API response time < 200ms
- [x] Database queries optimized (< 50ms)
- [x] Authentication success rate > 99%
- [x] Course generation success rate > 95%

### Phase 2 Metrics
- [x] Frontend-backend integration complete
- [x] Stripe payment success rate > 98%
- [x] User sign-up conversion > 5%
- [x] Free-to-paid conversion > 2%

### Phase 3 Metrics
- [x] Bounties posted automatically
- [x] Expert sign-up rate > 50 in first month
- [x] Bounty completion rate > 70%
- [x] Platform revenue from marketplace > £500/month

### Phase 4 Metrics
- [x] API cost reduction > 80%
- [x] Demand score accuracy > 85%
- [x] Auto-generation trigger rate > 60%

### Phase 5 Metrics
- [x] User satisfaction with adaptation > 4.5/5
- [x] Mode usage: Jonny (20%), Scott (15%), Standard (65%)

### Phase 6 Metrics
- [x] Audio generation success rate > 95%
- [x] Audio usage > 30% of users
- [x] Audio-only mode usage > 10%

### Phase 7 Metrics
- [x] Mobile app downloads > 1,000 in first month
- [x] AR experience completion rate > 60%
- [x] Museum partnerships > 2

---

## Risk Management

### Technical Risks

**Risk 1: Backend Scaling**
- **Mitigation:** Use serverless functions or containerization (Docker + Kubernetes)
- **Fallback:** Upgrade server resources as needed

**Risk 2: API Cost Overruns**
- **Mitigation:** Implement micro-test sampling (Phase 4)
- **Fallback:** Rate limiting and caching

**Risk 3: Payment Processing Failures**
- **Mitigation:** Stripe has 99.99% uptime
- **Fallback:** Retry logic and manual intervention

### Business Risks

**Risk 1: Low User Adoption**
- **Mitigation:** Strong marketing and SEO
- **Fallback:** Pivot to B2B (training providers)

**Risk 2: Expert Shortage (Marketplace)**
- **Mitigation:** Recruit experts proactively
- **Fallback:** Internal content creation team

**Risk 3: Regulatory Compliance Issues**
- **Mitigation:** Legal review of disclaimers
- **Fallback:** Remove regulated topics

---

## Budget Estimate

### Phase 1-2 (MVP Launch)
- **Development Time:** 7 weeks
- **Infrastructure:** £50-100/month (hosting, database, storage)
- **APIs:** £100-200/month (OpenAI, YouTube, Stripe)
- **Total:** £150-300/month

### Phase 3 (Marketplace)
- **Development Time:** 6 weeks
- **Additional Costs:** Stripe Connect fees (2.9% + 30¢ per transaction)

### Phase 4 (Sampling)
- **Development Time:** 3 weeks
- **Cost Savings:** £1,700/month (85% reduction)

### Phase 5-6 (Generational + Audio)
- **Development Time:** 6 weeks
- **Additional Costs:** Eleven Labs (£22-330/month depending on usage)

### Phase 7 (AR/VR)
- **Development Time:** 12 weeks
- **Additional Costs:** 3D modeling (£500-2,000), app store fees (£100/year)

**Total Estimated Budget (6 months):** £5,000-10,000

---

## Next Actions (This Week)

1. **Choose Backend Framework**
   - Decision: Node.js + Express OR Python + FastAPI
   - Set up project structure

2. **Set Up Database**
   - Install PostgreSQL locally and on production
   - Create all tables from schema

3. **Build Authentication**
   - Implement JWT-based auth
   - Test login/register flow

4. **Create First API Endpoints**
   - User profile
   - Course request
   - Course retrieval

5. **Deploy Backend to Production**
   - Choose hosting (Railway, AWS, or Vercel)
   - Set up CI/CD pipeline

---

**For strategic vision, see:** `MASTER_STRATEGIC_PLAN.md`  
**For architecture details, see:** `ARCHITECTURE.md`  
**For current platform status, see:** `README.md`

---

*Document maintained by: The Learn Master Team*  
*Roadmap Version: 1.0*  
*Last Review: November 30, 2025*
