# North Star Website Redesign — Requirements & Implementation Plan

## 1. Overview

| Field | Detail |
|---|---|
| **Current Website** | https://northstaronline.in/ |
| **Client** | North Star (name may change along with branding) |
| **Focus** | Institutional-first website |
| **Core Theme** | Developing Leaders, Empowering Institutions — From Classrooms to Careers |
| **Design Reference** | https://www.niit.com/india/stackroute |

---

## 2. Objective

- Redesign existing website with **primary focus on institutional partnerships** (Schools & Colleges)
- Secondary focus on individual / open programs
- Clean, professional, institution-oriented design
- Mobile-first and SEO-ready
- **No coaching-center style layouts**
- Journey-based storytelling: School → College → Career
- Easy future scalability

---

## 3. Required Pages

| # | Page | Route | Status |
|---|---|---|---|
| 1 | Home | `/` | **Major rewrite** |
| 2 | About / Our Mission (Team & Mentors) | `/about` | **Rework** |
| 3 | Our Approach (Classroom-to-Career) | `/approach` | **New page** |
| 4 | Institutional Programs (Overview) | `/institutional-programs` | **New page** |
| 5 | For Schools | `/for-schools` | **New page** |
| 6 | For Colleges / Universities | `/for-colleges` | **New page** |
| 7 | Open Programs | `/open-programs` | **Rebrand from Courses** |
| 8 | Contact / Partner With Us | `/contact` | **Rework** |

### Pages Removed / Demoted

- `/blog`, `/blog/[slug]` — **Removed** (not in requirements)
- `/about/founder` — **Merged** into About/Mission page
- `/courses`, `/courses/[slug]` — **Redirected** to `/open-programs`

---

## 4. Key Features Required

- [x] Clear institutional messaging above the fold
- [ ] Separate CTAs: Institutions (primary) + Open Programs (secondary)
- [ ] Responsive design (desktop & mobile-first)
- [ ] Contact forms for enquiries (institutional + individual)
- [ ] Basic SEO structure (on-page metadata, sitemap)
- [ ] Certificate Validation (email trigger)
- [ ] Performance-optimized
- [ ] Carousel for academic partners ("Trusted By") and pic/video feedback
- [ ] Free Demo (SMS/email trigger)

---

## 5. Design Expectations

- Modern, minimal, institutional look
- Journey-based storytelling (School → College → Career)
- No coaching-center style layouts
- Easy future scalability
- Reference: NIIT StackRoute — clean B2B layout, partner logos, case studies, testimonials

---

## 6. Page-by-Page Implementation Plan

### 6.1 Home Page (`/`)

**Current:** Individual-focused hero ("Discover, Build and Augment Your Potential"), Methodology, Why Choose Us, Courses grid, Statistics, Latest Blogs

**New Design:**
- **Hero:** Institutional tagline "Developing Leaders, Empowering Institutions — From Classrooms to Careers" with dual CTAs
  - Primary CTA: "Partner With Us" (for institutions)
  - Secondary CTA: "Explore Open Programs" (for individuals)
- **Trusted By:** Logo carousel of academic partners
- **Impact Statistics:** Institution-focused metrics (partners, students impacted, programs delivered)
- **Our Approach:** Brief overview of Classroom-to-Career framework
- **Institutional Programs:** Overview cards (For Schools, For Colleges)
- **Testimonials:** Carousel with partner feedback (photo/video)
- **Open Programs:** Brief section for individual courses
- **CTA Section:** "Partner With Us" footer CTA

**Sections removed:** Methodology, Why Choose Us (old style), Latest Blogs

---

### 6.2 About / Our Mission (`/about`)

**Current:** About North Star + Founder page (separate)

**New Design:**
- Mission & Vision statement (institutional focus)
- The North Star story / journey
- Team & Mentors section (founder + additional team members)
- Credentials and key offerings
- Values section

---

### 6.3 Our Approach (`/approach`) — NEW

- Classroom-to-Career Framework visual journey
- Step-by-step: School → College → Career pipeline
- Methodology cards (Reinforcement Learning, Mock Sessions, etc.)
- Why this approach works — outcomes & philosophy
- CTA: "See Our Programs"

---

### 6.4 Institutional Programs Overview (`/institutional-programs`) — NEW

- Overview of all institutional offerings
- Cards linking to: For Schools, For Colleges
- Key differentiators for institutional partners
- Partnership model overview
- CTA: "Partner With Us"

---

### 6.5 For Schools (`/for-schools`) — NEW

- Hero specific to school partnerships
- Programs tailored for schools (Emotional Harmony, Cognitive Readiness, etc.)
- Benefits for schools
- How it works (partnership model)
- Testimonials from school partners
- CTA: "Schedule a Discussion"

---

### 6.6 For Colleges / Universities (`/for-colleges`) — NEW

- Hero specific to college/university partnerships
- Programs tailored for higher education (Industry Readiness, AI Ecosystem, Programming, etc.)
- Benefits for colleges
- How it works (partnership model)
- Case studies / testimonials
- CTA: "Schedule a Discussion"

---

### 6.7 Open Programs (`/open-programs`) — REBRAND

**Current:** `/courses` page with 10 courses listed with category filters

**Changes:**
- Rebrand from "Courses" to "Open Programs"
- Position as secondary offering for individuals
- Keep existing course data and detail pages
- Update route from `/courses/[slug]` to `/open-programs/[slug]`
- Add note: "Also available as institutional programs"

---

### 6.8 Contact / Partner With Us (`/contact`) — REWORK

**Current:** General contact form + FAQ

**New Design:**
- Dual-track contact:
  - **Tab 1:** "Institutional Enquiry" (primary) — school/college name, designation, programs of interest
  - **Tab 2:** "Individual Enquiry" (secondary) — personal details, course interest
- Certificate Validation section (email trigger)
- Free Demo request (SMS/email trigger)
- Contact info, map, hours
- FAQ section (updated for institutional focus)

---

## 7. Data & Content Changes

### Navigation
```
Old: Home | About | Courses | Blog | Contact
New: Home | About | Our Approach | Programs (dropdown: Institutional, For Schools, For Colleges, Open Programs) | Contact
```

### Site Config
- Tagline: "Developing Leaders, Empowering Institutions"
- Description: Updated for institutional focus
- Branding: Must be configurable (name may change)

### New Data Needed
- Team/mentors array (beyond just founder)
- Institutional partner logos
- Testimonials (with photo/video support)
- School-specific programs
- College-specific programs
- Partnership model content

---

## 8. Component Changes

| Component | Action |
|---|---|
| `Header` | Update navigation, add Programs dropdown |
| `Footer` | Update links, remove blog references |
| `Hero` | Complete rewrite for institutional messaging |
| `PartnerCarousel` | **New** — trusted-by logo ticker |
| `TestimonialCarousel` | **New** — feedback with photo/video |
| `JourneyTimeline` | **New** — School→College→Career visual |
| `ProgramCard` | **New** — institutional program cards |
| `InstitutionalForm` | **New** — institutional inquiry form |
| `CertificateValidator` | **New** — certificate validation widget |
| `Statistics` | Rework with institutional metrics |
| `CoursesSection` | Rebrand to program overview |
| `Methodology` | Move to Approach page |
| `WhyChooseUs` | Rework or remove |
| `LatestBlogs` | Remove |

---

## 9. Technical Changes

- New routes: `/approach`, `/institutional-programs`, `/for-schools`, `/for-colleges`, `/open-programs`, `/open-programs/[slug]`
- Redirects: `/courses` → `/open-programs`, `/blog` → remove
- SEO: per-page metadata, structured data (JSON-LD)
- Forms: backend integration for email/SMS triggers
- Performance: image optimization, lazy loading

---

## 10. Timeline & Deliverables

Per the requirement document, the client expects:
- UI/UX design + development
- Homepage + internal page templates
- Mobile responsive version
- Go-live support

Optional (quoted separately):
- Content writing
- SEO services
- Ongoing maintenance (monthly updates on Partners/Events/Feedback)
