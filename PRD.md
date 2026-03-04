# Product Requirements Document
## Embroker Insurance MCP App

**Document Version:** 1.0
**Date:** January 27, 2026
**Author:** Product Team
**Status:** Ready for Stakeholder Review 

---

## Executive Summary

The Embroker Insurance MCP App is an AI-native distribution channel that positions Embroker at the point of intent when users ask AI assistants for business insurance guidance. Built on the Model Context Protocol (MCP), this tool integrates directly into AI assistants like Claude and ChatGPT, creating a new top-of-funnel acquisition channel with high-intent users.

### Key Highlights

- **New Distribution Channel:** Reach users at the exact moment they're seeking insurance guidance
- **Cross-Platform Reach:** MCP is adopted by both Anthropic (Claude) and OpenAI (ChatGPT), providing access to 200M+ weekly active users
- **High-Intent Leads:** Users who ask AI for insurance help are actively in-market
- **Reduced Friction:** Pre-filled applications eliminate redundant data entry
- **First-Mover Advantage:** Early presence in emerging AI app marketplaces

---

## Problem Statement

### Current Acquisition Challenges

1. **Discovery Gap:** Users researching insurance online often don't know Embroker exists
2. **Generic Search Results:** SEO competition is fierce; users see the same big-name insurers
3. **Friction in Application:** Users must re-enter company information multiple times
4. **Timing Mismatch:** Marketing reaches users when they're not actively shopping

### The Shift in User Behavior

Users increasingly turn to AI assistants for complex decisions:

| Behavior | Implication |
|----------|-------------|
| "What insurance does my startup need?" | Users expect AI to guide them, not just list options |
| Conversational research | Users want dialogue, not forms |
| Immediate action | Users expect to act on recommendations instantly |

**If Embroker isn't present in AI conversations about insurance, we're invisible to a growing segment of high-intent buyers.**

---

## Solution

### The Embroker MCP App

An interactive tool that integrates with AI assistants to:

1. **Engage users in conversation** about their insurance needs
2. **Provide personalized recommendations** based on industry and company stage
3. **Display an interactive UI** for coverage selection
4. **Redirect to Embroker signup** with pre-filled application data

### User Flow

```
User asks AI about insurance
         │
         ▼
AI gathers company info conversationally
(name, industry, funding status)
         │
         ▼
Embroker MCP App displays coverage options
         │
         ▼
User selects coverages
         │
         ▼
Redirect to Embroker with pre-filled data
         │
         ▼
User completes application (reduced friction)
```

### Demo Scenarios

| User Type | AI Conversation | Coverages Shown |
|-----------|-----------------|-----------------|
| Funded Startup | "I need insurance for my Series A fintech company" | Tech E&O, D&O, EPLI, BOP + Cyber, Fiduciary |
| Bootstrapped | "What insurance does my bootstrapped SaaS need?" | Tech E&O, BOP |
| Law Firm | "Insurance for my 10-person law practice" | Lawyers PL, Cyber, BOP |

---

## Market Opportunity

### MCP: The Universal AI Plugin Standard

The Model Context Protocol (MCP) is emerging as **the standard for extending AI assistants**. Critically, it's adopted by the two largest AI companies:

| Company | Product | Weekly Active Users | MCP Support |
|---------|---------|---------------------|-------------|
| **Anthropic** | Claude | 50M+ | Native support |
| **OpenAI** | ChatGPT | 200M+ | Announced support |

**This means one MCP app can reach users across both platforms.**

### The Coming AI App Store

Both Anthropic and OpenAI are building **AI app marketplaces** (similar to mobile app stores):

- **Current State:** Users manually install MCP apps (developer-focused)
- **Near Future:** One-click installation from marketplace (consumer-focused)
- **Opportunity:** Early apps will have visibility advantage when marketplaces launch

### Total Addressable Market

| Metric | Value |
|--------|-------|
| Combined AI assistant users | 250M+ weekly active |
| Users asking business questions | ~30% (75M) |
| Insurance-related queries | ~2% (1.5M/week) |
| SMB insurance market (US) | $120B annually |

**Even capturing 0.1% of AI-driven insurance queries could represent significant new lead volume.**

---

## Funnel Analysis

### Traditional Funnel vs. MCP Funnel

```
TRADITIONAL FUNNEL                    MCP FUNNEL
─────────────────                    ───────────
Google Search                        AI Conversation
     │                                    │
     ▼                                    ▼
Land on Website (high bounce)        Interactive UI (engaged)
     │                                    │
     ▼                                    ▼
Navigate to Products                 Personalized Recommendations
     │                                    │
     ▼                                    ▼
Start Application (cold)             Pre-filled Application (warm)
     │                                    │
     ▼                                    ▼
Complete Application                 Complete Application

Conversion: ~2-3%                    Expected: 10-15%
```

### Why MCP Converts Better

1. **Intent Signal:** User explicitly asked for insurance help
2. **Personalization:** Recommendations match their specific situation
3. **Reduced Friction:** Company data already collected
4. **Trust Transfer:** AI assistant endorsement carries weight
5. **Immediate Action:** No navigation required, direct to signup

### Projected Funnel Metrics

| Stage | Traditional | MCP (Projected) |
|-------|-------------|-----------------|
| Visitor → Start Application | 5% | 20% |
| Start → Complete Application | 40% | 60% |
| Complete → Bind Policy | 25% | 30% |
| **Overall Conversion** | **0.5%** | **3.6%** |

---

## Competitive Advantage

### First-Mover in AI Distribution

| Competitor | AI Presence | MCP App |
|------------|-------------|---------|
| Embroker | Yes (this project) | Ready |
| Next Insurance | No | No |
| Vouch | No | No |
| Coalition | No | No |

**Embroker can establish presence before competitors recognize the channel.**

### Defensibility

1. **Brand Association:** Early presence creates "Embroker = AI insurance" association
2. **Marketplace Position:** Early apps get featured placement when stores launch
3. **Data Advantage:** Learn user patterns before competitors enter
4. **Iteration Lead:** Refine UX while competitors are still building

---

## Technical Implementation

### Current Status: MVP Complete

| Component | Status | Notes |
|-----------|--------|-------|
| MCP Server | ✅ Complete | Tool registration, schema definition |
| React UI | ✅ Complete | Responsive, branded, interactive |
| Business Logic | ✅ Complete | Coverage recommendations by segment |
| Claude Desktop | ✅ Tested | Working integration |
| Documentation | ✅ Complete | README, setup guides |

### Production Requirements

| Requirement | Effort | Priority |
|-------------|--------|----------|
| Deploy to cloud hosting | 1 week | P0 |
| Change redirect to production URL | 1 day | P0 |
| Add analytics/tracking | 1 week | P0 |
| Error monitoring (Sentry) | 2 days | P1 |
| A/B testing framework | 2 weeks | P2 |

### Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Cloud Hosting (Vercel/Railway)           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Embroker MCP Server                     │   │
│  │  • HTTP endpoint: /mcp                              │   │
│  │  • Tool: show_coverage_selection                    │   │
│  │  • Bundled React UI                                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    AI Assistants                             │
│  • Claude Desktop / Claude.ai                               │
│  • ChatGPT (when MCP support launches)                      │
│  • Future: AI app marketplaces                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Embroker Platform (existing)                    │
│  • Signup: app.embroker.com/signup                         │
│  • Pre-filled via URL parameters                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Roadmap

### Phase 1: Production Launch (2 weeks)

- [ ] Deploy MCP server to production hosting
- [ ] Update redirect URL to production
- [ ] Implement analytics tracking
- [ ] Create installation guide for users
- [ ] Internal team testing

### Phase 2: Distribution (4 weeks)

- [ ] Publish to npm for easy installation
- [ ] Outreach to AI/startup communities
- [ ] Create demo videos and content
- [ ] Monitor and respond to user feedback
- [ ] Prepare for marketplace submissions

### Phase 3: Optimization (Ongoing)

- [ ] A/B test coverage recommendations
- [ ] Expand to additional verticals (Healthcare, Accounting, etc.)
- [ ] Add more interactive features (quote estimates, comparisons)
- [ ] Integrate with Embroker CRM for lead scoring

### Phase 4: Marketplace Launch (When Available)

- [ ] Submit to Claude marketplace
- [ ] Submit to ChatGPT plugin store
- [ ] Optimize listing for discovery
- [ ] Paid promotion within marketplaces

---

## Success Metrics

### Primary KPIs

| Metric | Target (90 days) | Measurement |
|--------|------------------|-------------|
| MCP App Installs | 1,000 | Analytics |
| Tool Invocations | 5,000 | Server logs |
| Signup Redirects | 500 | URL tracking |
| Applications Started | 200 | Embroker analytics |
| Policies Bound | 20 | Embroker CRM |

### Secondary KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| Coverage Selection Rate | >80% | UI analytics |
| Average Coverages Selected | 2.5 | UI analytics |
| Time to Redirect | <3 min | Session tracking |
| User Satisfaction | >4.0/5 | Follow-up survey |

### Funnel Tracking

```
Tool Invoked → Coverages Displayed → Coverage Selected → Continue Clicked → Signup Started → Application Complete → Policy Bound
```

---

## Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Slow MCP adoption | Medium | High | Focus on Claude Desktop first; diversify to ChatGPT |
| Marketplace delayed | Medium | Medium | Direct distribution via npm and GitHub |
| Low conversion | Low | High | A/B testing; iterate on recommendations |
| Competitor entry | Medium | Medium | Move fast; build brand association |
| AI assistant changes | Low | High | Abstract integration layer; monitor announcements |

---

## Investment Required

### Development (Already Complete)

| Item | Cost | Status |
|------|------|--------|
| MCP Server Development | $15,000 | ✅ Complete |
| React UI Development | $10,000 | ✅ Complete |
| Testing & QA | $5,000 | ✅ Complete |

### Production Launch

| Item | Cost (Est.) | Timeline |
|------|-------------|----------|
| Cloud Hosting (annual) | $2,400 | Ongoing |
| Analytics Integration | $3,000 | 1 week |
| Monitoring Setup | $1,500 | 2 days |
| Documentation & Guides | $2,000 | 1 week |
| **Total Production** | **$8,900** | **2 weeks** |

### Ongoing Operations

| Item | Monthly Cost |
|------|--------------|
| Hosting | $200 |
| Monitoring | $100 |
| Maintenance | $1,000 |
| **Total Monthly** | **$1,300** |

---

## Recommendation

### Why Now?

1. **MVP is complete** — minimal additional investment to launch
2. **First-mover window** — competitors haven't recognized this channel
3. **Marketplace timing** — establish presence before stores launch
4. **Low risk** — can measure results with minimal commitment

### Ask

**Approve production deployment and initial distribution effort.**

| Decision | Investment | Expected Outcome |
|----------|------------|------------------|
| Approve | $8,900 + $1,300/mo | New acquisition channel with 3.6% projected conversion |
| Delay | $0 | Miss first-mover window; competitors may enter |

---

## Appendix

### A. Technical Stack

- **Server:** Node.js, TypeScript, MCP SDK
- **UI:** React 19, Vite, Lucide Icons
- **Protocol:** Model Context Protocol (MCP)
- **Hosting:** Vercel/Railway (recommended)

### B. Supported AI Platforms

| Platform | Status | Timeline |
|----------|--------|----------|
| Claude Desktop | ✅ Supported | Now |
| Claude.ai | 🔄 Coming | Q1 2026 |
| ChatGPT | 📋 Planned | When MCP support launches |

### C. Links

- [GitHub Repository](https://github.com/evansluccas/embroker-mcp-app)
- [MCP Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Apps SDK](https://github.com/modelcontextprotocol/ext-apps)

---

**Document Prepared By:** Product Team
**Last Updated:** January 27, 2026
