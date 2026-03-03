# WhatsApp Integration for North Star Academy

> March 2026

---

## What Currently Happens (Without WhatsApp)

When someone fills out a form on the website, **three things already happen:**

1. **On-screen confirmation** — The user immediately sees a success message on the web page itself (e.g., "Thank you! We'll get back to you within 24 hours.")
2. **Email to admin** — The admin receives an email notification with the inquiry details
3. **Email to user** — The user receives an auto-reply/acknowledgement email

So the admin is **already notified via email**, and the user **already gets both an on-screen message and an email confirmation.**

---

## ⚠️ Question: Is WhatsApp Really Needed?

Before proceeding with the setup (which involves cost, a dedicated phone number, business verification, etc.), please consider:

- The **admin already gets an email** for every form submission. Is that not sufficient?
- The **user already sees a confirmation on the web page** and **receives an acknowledgement email**. Do they really need a WhatsApp message too?
- WhatsApp notifications cost **₹0.15–₹0.35 per message** and require a **dedicated SIM card** that can't be used on the WhatsApp mobile app.

**If the answer is:** "Email is enough for the admin, and the user already gets on-page + email confirmation" → **WhatsApp integration is not needed. No further action required.**

**If the answer is:** "We still want WhatsApp because [instant visibility / admin prefers WhatsApp over email / we want the user to get a WhatsApp confirmation too]" → **Continue reading below.**

---

## What We Want (If Proceeding)

When someone fills out a form on the website, **both email AND WhatsApp messages** should trigger automatically — to **both** the admin and the user:

| Recipient | What they already get | What we'll add |
|---|---|---|
| **User** | On-screen confirmation + acknowledgement email | WhatsApp acknowledgement message |
| **Admin** | Email notification with inquiry details | WhatsApp notification with inquiry details |

---

## How It Works (Simple Version)

> Visitor fills a form on the website → Website sends **email to both** (already working) + **WhatsApp to both** (new)

Both the admin and the user receive an email AND a WhatsApp message. No manual work needed — fully automated.

---

## What Service We Need

**WhatsApp Cloud API by Meta** — this is Meta's official API for sending automated WhatsApp messages. It's the same service used by companies like Flipkart, Razorpay, and Swiggy.

This is the **only official way** to send automated WhatsApp messages from a website. There are no free alternatives for this.

---

## Where WhatsApp Notifications Will Be Added

The website has **3 forms** that currently send emails. Each one will also send WhatsApp messages to **both admin and user**:

| # | Website Form | What Happens Now | What We'll Add (WhatsApp) |
|---|---|---|---|
| 1 | **Contact Form** | On-page confirmation + Email to admin + Email to user | WhatsApp to admin (inquiry details) + WhatsApp to user (acknowledgement) |
| 2 | **Free Demo Request** | On-page confirmation + Email to admin + Email to user | WhatsApp to admin (demo details) + WhatsApp to user (acknowledgement) |
| 3 | **Certificate Validation** | On-page confirmation + Email to admin + Email to user | WhatsApp to admin (certificate ID) + WhatsApp to user (acknowledgement) |

**Total: 6 WhatsApp messages per inquiry cycle (3 to admin + 3 to user) across the 3 forms.**

---

## Pricing

### Per-Message Cost (India, effective 2025–2026)

Our use case falls under **Utility templates** — simple notifications like "New inquiry from John Doe."

| Template Category | Cost per Message |
|---|---|
| **Utility** (our use case) | **~₹0.15 – ₹0.35** |
| Marketing | ~₹0.80 – ₹1.00 |
| Authentication (OTP) | ~₹0.15 – ₹0.25 |

> Rates are set by Meta and change quarterly. See: [Official Pricing Page](https://developers.facebook.com/docs/whatsapp/pricing)

### Estimated Monthly Cost for North Star

Since we're sending to **both admin and user**, each inquiry triggers **2 WhatsApp messages**:

| Scenario | Inquiries/month | Messages (2 per inquiry) | Approx. cost |
|---|---|---|---|
| Low traffic | 50 | 100 | **₹15 – ₹35** |
| Medium traffic | 200 | 400 | **₹60 – ₹140** |
| High traffic | 500 | 1,000 | **₹150 – ₹350** |

**Bottom line: Even at 200 inquiries/month, this costs less than a cup of coffee.**

---

## Important Things to Know

| Item | Details |
|---|---|
| **Dedicated phone number needed** | You need a separate SIM/number for the WhatsApp API. Once connected to the API, that number can **no longer** be used on the WhatsApp mobile app. Your personal WhatsApp number is unaffected. |
| **Business verification required** | Meta requires you to verify the business before going live. You'll need to submit one of: GST Certificate, Udyam Registration, Business PAN Card, or similar document. Takes **1–5 business days**. |
| **Message template approval** | WhatsApp messages sent from the API must use pre-approved templates (fixed message formats with placeholders for names, phone numbers, etc.). You create these in the Meta dashboard. Approval takes **24–48 hours**. |
| **Per-message cost** | Every automated notification costs ~₹0.15–₹0.35. There is no completely free tier for sending outbound messages. |
| **No free-form messages** | You can only send free-text messages if the user messages you first on WhatsApp. Since our users submit web forms (not WhatsApp messages), we must use pre-approved templates — which are charged. |

---

## Message Templates to Create

These are the notification messages that need to be created in the Meta dashboard. Meta will review and approve them (typically within 24–48 hours).

**Template 1 — "New Contact Inquiry" (sent to admin)**

> New inquiry from [Name]
>
> Type: [Individual / Institutional]
> Email: [user's email]
> Phone: [user's phone]
>
> Message: [first 200 characters of their message]

**Template 2 — "New Demo Request" (sent to admin)**

> New free demo request!
>
> Name: [Name]
> Email: [user's email]
> Phone: [user's phone]
> Program Interest: [selected program]

**Template 3 — "Certificate Validation" (sent to admin)**

> Certificate validation requested.
>
> Certificate ID: [ID]
> Email: [user's email]

**Template 4 — "Acknowledgement" (sent to user)**

> Hi [Name], thank you for reaching out to North Star Academy!
>
> We've received your inquiry and will get back to you within 24 hours.
>
> — The North Star Academy Team

> Note: Template wording may need minor adjustments during Meta's approval process.

---

## What Needs To Be Done (Step-by-Step)

**Time estimate: 1–2 hours for setup + 1–5 days for business verification and template approval**

### Step 1: Get a Dedicated Phone Number

- Buy a new SIM card (any operator) — costs ₹50–₹200
- This number will be used exclusively for the WhatsApp API
- ⚠️ Once connected to the API, this number can **no longer** be used on the WhatsApp mobile app

### Step 2: Create a Facebook Account

- Go to [facebook.com](https://facebook.com) and create an account (or use existing one)

### Step 3: Register as a Meta Developer

- Go to [developers.facebook.com](https://developers.facebook.com/async/registration/)
- Follow the prompts to register (free)

### Step 4: Create a Meta App

- Go to the [App Dashboard](https://developers.facebook.com/apps)
- Click **Create App**
- Select **"Connect with customers through WhatsApp"**
- Create or link a **Meta Business Portfolio**
- Finish creating the app

### Step 5: Connect WhatsApp Business Account

- In the App Dashboard, click **Use cases** → **Customize**
- In **API Setup**, select or create a WhatsApp Business Account
- **Note down:** the **WhatsApp Business Account ID** shown on screen

### Step 6: Add the Business Phone Number

- Add the dedicated phone number from Step 1
- Verify it via SMS or phone call
- **Note down:** the **Phone Number ID** shown on screen

### Step 7: Test It

- Use the temporary access token provided in the dashboard
- Send the built-in "hello_world" test template to your personal WhatsApp number
- Confirm you received the test message

### Step 8: Create a System User & Permanent Token

- Go to [Business Settings](https://business.facebook.com/latest/settings) → **System users**
- Click **Add+** → create an **Admin** system user
- Click **Assign Assets** → assign your app (Full control) and WhatsApp account (Manage)
- Click **Generate token** — select all WhatsApp-related permissions
- **Copy and save the token securely** — this is the permanent access token we need

### Step 9: Create Message Templates

- Go to [WhatsApp Manager](https://business.facebook.com/wa/manage/home/) → **Message Templates**
- Create the 3–4 templates listed in the "Message Templates to Create" section above
- Submit for approval (typically approved within 24–48 hours)

### Step 10: Verify the Business

- Go to [Business Settings](https://business.facebook.com/latest/settings) → **Security Center**
- Click **Start Verification**
- Submit one of:
  - GST Certificate
  - Udyam Registration Certificate
  - Business PAN Card
  - Other official business registration document
- Verification typically takes **1–5 business days**

---

## What to Share Back (Credentials Needed)

Once the setup is complete, please share the following. I'll plug these into the website and the WhatsApp integration will go live:

| # | What | Where to Find It |
|---|---|---|
| 1 | **Phone Number ID** | App Dashboard → WhatsApp → API Setup |
| 2 | **WhatsApp Business Account ID** | App Dashboard → WhatsApp → API Setup |
| 3 | **Permanent Access Token** | Business Settings → System Users → Generate Token |
| 4 | **Business Phone Number** | The dedicated number registered with the API (with country code, e.g., +91 98765 43210) |
| 5 | **Admin's Personal WhatsApp Number** | The number where the admin wants to **receive** notifications (e.g., +91 98765 43210) |
| 6 | **Template Names** | The names of the approved templates (e.g., "new_contact_inquiry") |

> **Note:** Users' WhatsApp numbers will come from the phone number they enter in the website form. Users who don't provide a phone number will only receive email notifications.

---

## Bonus: "Chat with Us" WhatsApp Button (FREE)

Separately from the automated notifications above, we can also add a **floating green WhatsApp button** on the website — completely free, no Meta developer account needed.

- Visitor clicks the floating button
- WhatsApp opens with a pre-filled message like: "Hi, I'm interested in North Star Academy programs."
- Visitor sends it, and you receive it on your WhatsApp Business app

**What's needed:** Just the WhatsApp Business phone number (can be the same number you use on the mobile app — does NOT have to be the API number).

This can be implemented immediately — no setup or verification needed.

---

## Quick Summary

| Item | Details |
|---|---|
| **Already working** | On-page confirmation + email to admin + email to user |
| **Proposed addition** | WhatsApp to admin + WhatsApp to user (alongside existing emails) |
| **Service** | WhatsApp Cloud API by Meta (official) |
| **Cost** | ~₹0.15–₹0.35 per message (2 messages per inquiry) |
| **Monthly estimate** | ₹15–₹350 depending on traffic |
| **Setup time** | 1–2 hours + 1–5 days for verification |
| **What you need** | A dedicated SIM card + Facebook account + business documents (GST/PAN) |
| **What to share back** | Phone Number ID, WABA ID, Permanent Access Token, Phone Numbers, Template Names |
| **Official pricing page** | [developers.facebook.com/docs/whatsapp/pricing](https://developers.facebook.com/docs/whatsapp/pricing) |

**First decision needed: Is WhatsApp even required, given that email notifications and on-page confirmations are already working?**
