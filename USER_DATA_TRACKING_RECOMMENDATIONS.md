# User Data Tracking Recommendations

## 1. Website Analytics (Anonymous Visitor Tracking)
- **Google Analytics 4 (GA4)** or **Plausible/Umami** (privacy-friendly alternatives)
- Track: page views, session duration, bounce rate, traffic sources, device info
- Key insight: which pages convert visitors → demo requests or assessment attempts

## 2. Lead Capture & CRM Integration
You already have Supabase storing assessment leads and demo requests. Expand this:
- **Lead scoring**: Track how many times a user visits before submitting a demo request
- **UTM parameter tracking**: Store `utm_source`, `utm_medium`, `utm_campaign` from URLs so you know which marketing channels work
- **Funnel tracking**: Landing page → Token entry → Assessment start → Assessment complete → Certificate download

## 3. Assessment Analytics Dashboard
Since you already store assessment results in Supabase, consider tracking:
- **Completion rates**: How many users start vs. finish the assessment
- **Average scores per category** (self-awareness, empathy, etc.) — useful for institutional reports
- **Time spent per question** — identifies confusing or easy questions
- **Drop-off points** — which question number users typically abandon at
- **Institution-level analytics** — aggregate scores by school/college for B2B clients

## 4. User Session Tracking (Cookie/Token-based)
Standard for commercial coaching platforms:
- **Anonymous session ID** stored in a cookie — links page views to a single visitor without requiring login
- **Returning visitor detection** — "Welcome back" experience
- **Assessment history** — if the same email takes the assessment again, compare scores over time (growth tracking)

## 5. Contact & Demo Request Pipeline
- **Status tracking**: New → Contacted → Demo Scheduled → Converted → Lost
- **Response time tracking**: How quickly your team follows up
- **Source attribution**: Which page/form generated each lead
- Store the **referring page URL** when someone submits a contact or demo form

## 6. Event Tracking (Behavioral)
Track micro-interactions without a full analytics platform:
- Button clicks (CTA buttons, "Request Demo", "Start Assessment")
- Scroll depth on key pages (approach, institutional programs)
- PDF/certificate downloads
- External link clicks (Career Counselling link, partner sites)

## 7. Privacy & Compliance Considerations
- Add a **cookie consent banner** (required if serving users in the EU or many Indian institutions)
- Create a **Privacy Policy** page explaining what data you collect
- Implement **data retention policies** — auto-delete old anonymous session data after 90-180 days
- Offer **data export/deletion** for identified users (email-based leads)

## 8. Recommended Architecture for Your Stack

| Layer | Tool | Purpose |
|-------|------|---------|
| Anonymous analytics | GA4 or Umami (self-hosted) | Traffic & behavior |
| Lead management | Supabase tables (already have) | Store leads, demo requests |
| Event tracking | Custom Supabase `events` table | Button clicks, funnel steps |
| Session tracking | Cookie + Supabase `sessions` table | Link anonymous visits to conversions |
| Admin dashboard | Extend your `/assessment/admin` | View analytics, lead pipeline |

## Priority Recommendation
For a coaching institute at this stage, start with:
1. **GA4** (free, instant insights) — zero code effort with a `<Script>` tag
2. **UTM tracking on lead forms** — small code change, huge marketing insight
3. **Assessment completion funnel** in Supabase — you already have the data, just need a few extra columns (`started_at`, `completed_at`, `dropped_at_question`)
